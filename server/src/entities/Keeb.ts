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
export class User extends BaseEntity {
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
  @Column({ type: 'number' })
  authenticity: number

  @Field(() => [String])
  @Column({ type: 'array' })
  switches: string[]

  @Field(() => Number)
  @Column({ type: 'number' })
  askPrice: number

  @Field(() => Number)
  @Column({ type: 'number' })
  bidPrice: number

  @Field(() => Number)
  @Column({ type: 'number' })
  lastSale: number

  @Field()
  @Column()
  salesId: string 

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
