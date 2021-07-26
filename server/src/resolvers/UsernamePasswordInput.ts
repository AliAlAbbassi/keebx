import { InputType, Field } from 'type-graphql'
@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string
  @Field()
  username: string
  @Field()
  password: string
  @Field(() => String, { nullable: true })
  bio?: string | null
  @Field(() => String, { nullable: true })
  profilePhotoUrl?: string | null
}
