import { validateKeebOptions } from '../Utils/validateKeebOptions'
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Keeb } from '../entities/Keeb'
import { KeebOptions } from '../options'

@ObjectType()
class KeebFieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class KeebResponse {
  @Field(() => [KeebFieldError], { nullable: true })
  errors?: KeebFieldError[]

  @Field(() => [Keeb], { nullable: true })
  keebs?: Keeb[]

  @Field(() => Keeb, { nullable: true })
  keeb?: Keeb
}

@Resolver(Keeb)
export class KeebResolver {
  @Query(() => Keeb, { nullable: true })
  keeb(@Arg('keebId') keebId: string) {
    return Keeb.findOne(keebId)
  }

  @Query(() => [Keeb], { nullable: true })
  keebs() {
    return Keeb.find()
  }

  @Query(() => [Keeb], { nullable: true })
  async keebsWithPagination(
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
    const keebs = await getConnection()
      .createQueryBuilder()
      .select('keeb')
      .from(Keeb, 'keeb')
      .limit(limit)
      .offset(offset)
      .getMany()

    console.log('keebs', keebs)

    return keebs
  }

  @Mutation(() => KeebResponse)
  async createKeeb(
    @Arg('options') options: KeebOptions
  ): Promise<KeebResponse> {
    let keeb

    const errors = validateKeebOptions(options)
    if (errors) {
      return { errors }
    }

    try {
      Keeb.create(options).save()
    } catch (error) {
      return {
        errors: [
          {
            field: 'keeb',
            message: 'bad error',
          },
        ],
      }
    }
    return { keeb }
  }
}
