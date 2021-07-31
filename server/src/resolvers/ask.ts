import { Ask } from 'src/entities/Ask'
import { askInput } from '../options'
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'

@ObjectType()
class askFieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class askResponse {
  @Field(() => [askFieldError], { nullable: true })
  errors?: askFieldError[]

  @Field(() => Ask, { nullable: true })
  ask?: Ask
}

@Resolver(Ask)
export class askResolver {
  @Mutation(() => askResponse)
  async createAsk(
    @Arg('options') options: askInput
    // @Ctx() { req }: MyContext
  ): Promise<askResponse> {
    let ask

    try {
      // bid = await Bid.create(options).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Ask)
        .values([options])
        .execute()
      ask = result.raw[0]
    } catch (error) {
      return {
        errors: [
          {
            field: 'ask',
            message: 'ask error',
          },
        ],
      }
    }

    return { ask }
  }

  @Query(() => [Ask], { nullable: true })
  async asks(@Arg('keebId') keebId: number) {
    const asks = await getConnection()
      .getRepository(Ask)
      .createQueryBuilder('Ask')
      .where('ask.keebId = :keebId', { keebId })
      .getMany()

    return asks
  }

  @Mutation(() => askResponse)
  async deleteAsk(@Arg('askId') askId: number) {
    let ask
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Ask)
        .where('askId = :askId', { askId })
        .execute()

      ask = result.raw[0]
    } catch (error) {
      return {
        errors: [
          {
            field: 'ask',
            message: 'bad error',
          },
        ],
      }
    }
    return { ask }
  }
}
