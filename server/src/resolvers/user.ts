import argon2 from 'argon2'
import admin from 'firebase-admin'
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { v4 } from 'uuid'
import { FORGET_PASSWORD_PREFIX } from '../constants'
import { User } from '../entities/User'
import { MyContext } from '../types'
// import { sendEmail } from '../Utils/sendEmail'
import { validateRegister } from '../Utils/validateRegister'
import { UsernamePasswordInput } from './UsernamePasswordInput'
import { sendEmail } from '../Utils/sendEmail'

const db = admin.firestore()
const docRef = db.collection('users').doc('User')

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session!.userId === user.id) {
      return user.email
    }
    return ''
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPasssword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPasssword.length <= 2) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2',
          },
        ],
      }
    }

    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token)
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      }
    }

    const userIdInt = parseInt(userId)
    const user = await User.findOne(userIdInt)
    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      }
    }

    await User.update(
      { id: userIdInt },
      { password: await argon2.hash(newPasssword) }
    )

    await redis.del(FORGET_PASSWORD_PREFIX + token)

    // log in user after changing password
    req.session!.userId = user.id
    return { user }
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return true
    }
    const token = v4()
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 3
    )

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    )
    return true
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // u ain't logged in bro
    if (!req.session!.userId) {
      return null
    }

    let me: any
    const snapshot = await db.collection('users').get()
    snapshot.forEach((doc) => {
      if (parseInt(doc.id) === req.session!.userId) {
        me = doc.data()
      }
    })
    return { me }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options)
    if (errors) {
      return { errors }
    }
    const hashedPassword = await argon2.hash(options.password)
    let user
    // try {
    //   const result = await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into(User)
    //     .values({
    //       username: options.username,
    //       email: options.email,
    //       password: hashedPassword,
    //     })
    //     .returning('*')
    //     .execute()
    //   user = result.raw[0]
    // } catch (err) {
    //   // dupe username error
    //   if (err.detail.includes('already exists')) {
    //     return {
    //       errors: [
    //         {
    //           field: 'username',
    //           message: 'username already taken',
    //         },
    //       ],
    //     }
    //   }
    //   console.log('message: ', err.message)
    // }
    try {
      await docRef.set({
        email: options.email,
        password: hashedPassword,
        username: options.username,
      })
    } catch (err) {
      console.log('message', err.message)
      return {
        errors: [
          {
            field: 'username',
            message: 'username already taken',
          },
        ],
      }
    }

    const snapshot = await db.collection('users').get()
    snapshot.forEach((doc) => {
      if (doc.data().email == options.email) {
        req.session!.userId = parseInt(doc.id)
        user = doc.data()
      }
    })

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    let user: any
    const snapshot = await db.collection('users').get()
    snapshot.forEach((doc) => {
      if (usernameOrEmail.includes('@')) {
        if (doc.data().email == usernameOrEmail) {
          user = doc.data()
        }
      } else {
        if (doc.data().username == usernameOrEmail) {
          user = doc.data()
        }
      }
    })

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: "that username doesn't exist",
          },
        ],
      }
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      }
    }

    req.session!.userId = user.id
    return { user }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    res.clearCookie('qid')
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        if (err) {
          console.log(err)
          resolve(false)
          return
        }
        resolve(true)
      })
    )
  }
}
