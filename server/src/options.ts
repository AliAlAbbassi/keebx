import { condition } from './types'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@InputType()
export class KeebOptions {
  @Field()
  title: string

  @Field()
  ticker: string

  @Field(() => condition)
  condition: condition

  @Field(() => Number)
  authenticity: Number

  @Field(() => [String])
  switches: string[]

  @Field(() => [String], { nullable: true })
  bidIds?: string[]

  @Field(() => [String], { nullable: true })
  askIds?: string[]

  @Field(() => [Number], { nullable: true })
  sales?: number[]
}
