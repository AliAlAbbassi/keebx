import { condition } from './types';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@InputType()
export class KeebOptions {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  imageUrl!: string;

  @Field(() => String)
  ticker!: string;

  @Field(() => condition)
  condition: condition;

  @Field(() => Number)
  authenticity: number;

  @Field(() => [String])
  switches: string[];
}

@InputType()
export class updateKeebOptions {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  ticker?: string;

  @Field(() => condition, { nullable: true })
  condition?: condition;

  @Field(() => Number, { nullable: true })
  authenticity?: number;

  @Field(() => [String], { nullable: true })
  switches?: string[];
}

@InputType()
export class bidInput {
  @Field(() => Number)
  bidPrice!: number;

  @Field(() => Number)
  userId!: number;

  @Field(() => Number)
  keebId!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  ticker!: string;
}

@InputType()
export class askInput {
  @Field(() => Number)
  askPrice!: number;

  @Field(() => Number)
  userId!: number;

  @Field(() => Number)
  keebId!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  ticker!: string;
}

@InputType()
export class saleInput {
  @Field(() => Number)
  salePrice!: number;

  @Field(() => Number)
  bidId!: number;

  @Field(() => Number)
  askId!: number;

  @Field(() => Number)
  keebId!: number;
}
