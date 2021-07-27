import { Arg, Query, Resolver } from 'type-graphql'
import { Keeb } from '../entities/Keeb'

// @ObjectType()
// class FieldError {
//   @Field()
//   field: string
//   @Field()
//   message: string
// }

// @ObjectType()
// class KeebResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[]

//   @Field(() => Keeb, { nullable: true })
//   keeb?: Keeb
// }

@Resolver(Keeb)
export class KeebResolver {
  @Query(() => Keeb, { nullable: true })
  keeb(@Arg('keebId') keebId: string) {
    return Keeb.findOne(keebId)
  }
}
