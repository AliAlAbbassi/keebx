import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Bid } from '../entities/Bid'
import { bidInput } from '../options'

@ObjectType()
class bidFieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class bidResponse {
  @Field(() => [bidFieldError], { nullable: true })
  errors?: bidFieldError[]

  @Field(() => Bid, { nullable: true })
  bid?: Bid
}

@Resolver(Bid)
export class bidResolver {
  @Mutation(() => bidResponse)
  async createBid(
    @Arg('options') options: bidInput
    // @Ctx() { req }: MyContext
  ): Promise<bidResponse> {
    let bid

    try {
      // bid = await Bid.create(options).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Bid)
        .values([options])
        .execute()
      bid = result.raw[0]
      console.log(bid)
    } catch (error) {
      return {
        errors: [
          {
            field: 'bid',
            message: 'bad error',
          },
        ],
      }
    }

    return { bid }
  }

  @Query(() => [Bid], { nullable: true })
  async bids(@Arg('keebId') keebId: number) {
    const bids = await getConnection()
      .getRepository(Bid)
      .createQueryBuilder('bid')
      .where('bid.keebId = :keebId', { keebId })
      .getMany()

    return bids
  }

  @Mutation(() => bidResponse)
  async deleteBid(@Arg('bidId') bidId: number) {
    let bid
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Bid)
        .where('bidId = :bidId', { bidId })
        .execute()

      bid = result.raw[0]
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
    return { bid }
  }
}
