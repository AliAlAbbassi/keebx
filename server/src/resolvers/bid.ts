import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Ask } from '../entities/Ask'
import { Bid } from '../entities/Bid'
import { bidInput } from '../options'
import { askResolver } from './ask'
import { saleResolver } from './sale'

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
  async createBid(@Arg('options') options: bidInput): Promise<bidResponse> {
    let bidId

    try {
      // bid = await Bid.create(options).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Bid)
        .values([options])
        .execute()
      bidId = result.raw[0].bidId
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

    const lowestAsk = await getConnection()
      .getRepository(Ask)
      .createQueryBuilder('ask')
      .where('ask.keebId = :keebId', { keebId: options.keebId })
      .orderBy('ask.askPrice', 'ASC')
      .limit(1)
      .getOne()

    const bid = await this.bid(bidId)

    if (bid && lowestAsk)
      if (bid.bidPrice! > lowestAsk.askPrice!) {
        // make a sale
        const saleReso = new saleResolver()
        const sale = await saleReso.createSale({
          askId: lowestAsk?.askId!,
          bidId: bid?.bidId!,
          salePrice: bid?.bidPrice!,
          keebId: bid.keebId,
        })
        await this.deleteBid(bid.bidId)
        const askReso = new askResolver()
        await askReso.deleteAsk(lowestAsk.askId)
        console.log('new sale', sale)
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

  @Query(() => Bid, { nullable: true })
  async bid(@Arg('bidId') bidId: number) {
    const bid = await getConnection()
      .getRepository(Bid)
      .createQueryBuilder('bid')
      .where('bid.bidId = :bidId', { bidId })
      .getOne()

    return bid
  }

  @Query(() => Bid, { nullable: true })
  async highestBid(@Arg('keebId') keebId: number) {
    const highestBid = await getConnection()
      .getRepository(Bid)
      .createQueryBuilder('bid')
      .where('bid.keebId = :keebId', { keebId: keebId })
      .orderBy('bid.bidPrice', 'ASC')
      .limit(1)
      .getOne()

    return highestBid
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
            field: 'bid',
            message: 'bad error',
          },
        ],
      }
    }
    return { bid }
  }
}
