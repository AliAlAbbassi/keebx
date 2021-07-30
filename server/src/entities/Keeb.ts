import { Field, ObjectType, registerEnumType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { condition } from '../types'

registerEnumType(condition, {
  name: 'condition',
  description: 'Enum for the condition of the keeb',
})

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
  @Column({ type: 'text' })
  imageUrl!: string

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
