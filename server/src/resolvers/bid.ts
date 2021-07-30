import { Bid } from 'src/entities/Bid'
import { bidInput } from 'src/options'
import { ObjectType, Field, Resolver, Mutation, Arg } from 'type-graphql'

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
    let bid

    try {
      Bid.create(options).save()
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
