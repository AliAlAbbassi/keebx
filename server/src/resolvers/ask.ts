import { Ask } from '../entities/Ask'
import { askInput } from '../options'
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import { MyContext } from '../types'
import { Bid } from '../entities/Bid'
import { saleResolver } from './sale'
import { bidResolver } from './bid'

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
    @Arg('options') options: askInput,
    @Ctx() { redis }: MyContext
  ): Promise<askResponse> {
    let askId

    try {
      // bid = await Bid.create(options).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Ask)
        .values([options])
        .execute()
      askId = result.raw[0].askId
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

    const highestBid = await getConnection()
      .getRepository(Bid)
      .createQueryBuilder('bid')
      .where('bid.keebId = :keebId', { keebId: options.keebId })
      .orderBy('bid.bidPrice', 'ASC')
      .limit(1)
      .getOne()

    const ask = await this.ask(askId)

    if (ask && highestBid)
      if (highestBid.bidPrice! > ask.askPrice!) {
        // make a sale
        const saleReso = new saleResolver()
        saleReso.createSale({
          askId: ask?.askId!,
          bidId: highestBid?.bidId!,
          salePrice: highestBid?.bidPrice!,
          keebId: highestBid?.keebId!,
        })

        // delete bid/ask
        const bidReso = new bidResolver()
        await bidReso.deleteBid(highestBid?.bidId!)

        await this.deleteAsk(ask?.askId!)
      }
    return { ask }
  }

  @Query(() => Ask, { nullable: true })
  async ask(@Arg('askId') askId: number) {
    const ask = await getConnection()
      .getRepository(Ask)
      .createQueryBuilder('ask')
      .where('ask.askId = :askId', { askId })
      .getOne()

    return ask
  }
  @Query(() => [Ask], { nullable: true })
  async asks(@Arg('keebId') keebId: number) {
    const asks = await getConnection()
      .getRepository(Ask)
      .createQueryBuilder('ask')
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
