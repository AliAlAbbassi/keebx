import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Bid extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  bidId!: number

  @Field(() => Number)
  @Column({ type: 'decimal' })
  bidPrice!: number

  @Field(() => Number)
  @Column({ type: 'decimal' })
  userId!: number

  @Field(() => Number)
  @Column({ type: 'decimal' })
  keebId!: Number

  @Field(() => String)
  @Column({ type: 'text' })
  title!: string

  @Field(() => String)
  @Column({ type: 'text' })
  ticker!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
