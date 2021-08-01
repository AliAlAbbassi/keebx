import Redis from 'ioredis'
import { getConnection } from 'typeorm'
import { Ask } from './entities/Ask'
import { Bid } from './entities/Bid'
import { redis } from './index'
import { askResolver } from './resolvers/ask'
import { bidResolver } from './resolvers/bid'
import { saleResolver } from './resolvers/sale'

const sub = new Redis(process.env.REDIS_URL2)

sub.subscribe('sales-channel', (err, count) => {
  if (err) {
    console.error('Failed to subscribe: %s', err.message)
  } else {
    // `count` represents the number of channels this client are currently subscribed to.
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    )
  }
})

sub.on('new bid', async (channel, message) => {
  console.log(`Received ${message} from ${channel}`)

  const bidReso = new bidResolver()
  const askReso = new askResolver()
  const keebId = await redis.get('keebId')
  const bid = await getConnection()
    .getRepository(Bid)
    .createQueryBuilder('bid')
    .where('bid.keebId = :keebId', { keebId })
    .orderBy('bid.createdAt', 'DESC')
    .limit(1)
    .getOne()

  const lowestAsk = await getConnection()
    .getRepository(Ask)
    .createQueryBuilder('ask')
    .where('ask.keebId = :keebId', { keebId })
    .orderBy('ask.askPrice', 'ASC')
    .limit(1)
    .getOne()
  // const lowestAsk = getLowest(asks)

  if (bid?.bidPrice! > lowestAsk?.askPrice!) {
    // make a sale
    const saleReso = new saleResolver()
    saleReso.createSale({
      askId: lowestAsk?.askId!,
      bidId: bid?.bidId!,
      salePrice: bid?.bidPrice!,
    })

    // delete bid/ask
    bidReso.deleteBid(bid?.bidId!)

    askReso.deleteAsk(lowestAsk?.askId!)
  }
})

sub.on('new ask', async (channel, message) => {
  console.log(`Received ${message} from ${channel}`)

  const askReso = new askResolver()
  const bidReso = new bidResolver()
  const keebId = await redis.get('keebId')
  const highestBid = await getConnection()
    .getRepository(Bid)
    .createQueryBuilder('bid')
    .where('bid.keebId = :keebId', { keebId })
    .orderBy('bid.bidPrice', 'ASC')
    .limit(1)
    .getOne()

  const ask = await getConnection()
    .getRepository(Ask)
    .createQueryBuilder('ask')
    .where('ask.keebId = :keebId', { keebId })
    .orderBy('ask.createdAt', 'DESC')
    .limit(1)
    .getOne()
  // const lowestAsk = getLowest(asks)

  if (highestBid?.bidPrice! > ask?.askPrice!) {
    // make a sale
    const saleReso = new saleResolver()
    saleReso.createSale({
      askId: ask?.askId!,
      bidId: highestBid?.bidId!,
      salePrice: highestBid?.bidPrice!,
    })

    // delete bid/ask
    bidReso.deleteBid(highestBid?.bidId!)

    askReso.deleteAsk(ask?.askId!)
  }
})
