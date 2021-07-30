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

@InputType()
export class updateKeebOptions {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  ticker?: string

  @Field(() => condition, { nullable: true })
  condition?: condition

  @Field(() => Number, { nullable: true })
  authenticity?: Number

  @Field(() => [String], { nullable: true })
  switches?: string[]

  @Field(() => [String], { nullable: true })
  bidIds?: string[]

  @Field(() => [String], { nullable: true })
  askIds?: string[]

  @Field(() => [Number], { nullable: true })
  sales?: number[]
}
