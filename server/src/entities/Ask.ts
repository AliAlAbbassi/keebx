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
export class Ask extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  askId!: number

  @Field(() => Number)
  @Column({ type: 'decimal' })
  askPrice!: number

  @Field(() => Number)
  @Column({ type: 'decimal' })
  userId!: number

  @Field(() => Number)
  @Column({ type: 'decimal' })
  keebId!: number

  @Field(() => String)
  @Column({ unique: true, type: 'text' })
  title!: string

  @Field(() => String)
  @Column({ unique: true, type: 'text' })
  ticker!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
