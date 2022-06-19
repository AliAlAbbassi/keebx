import { InputType, Field } from 'type-graphql'
@InputType()
export class UserDetailsInput {
  @Field()
  email?: string
  @Field()
  username?: string
  @Field()
  bio?: string
  @Field()
  profilePhotoUrl?: string
}
