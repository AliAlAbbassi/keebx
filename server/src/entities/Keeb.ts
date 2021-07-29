import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

enum condition {
  'New',
  'Used',
}

@ObjectType()
@Entity()
export class Keeb extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({ unique: true, type: 'text' })
  title!: string

  @Field(() => String)
  @Column({ unique: true, type: 'text' })
  ticker!: string

  @Field(() => condition)
  @Column({ enum: condition })
  condition: condition

  @Field(() => Number)
  @Column({ type: 'decimal' })
  authenticity: Number

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  switches: string[]

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  bidIds: string[]

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  askIds: string[]

  @Field(() => [Number])
  @Column({ type: 'decimal', array: true })
  sales: number[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
