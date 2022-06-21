import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Sale extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  saleId!: number;

  @Field(() => Number)
  @Column({ type: 'decimal' })
  salePrice!: number;

  @Field(() => Number)
  @Column({ type: 'decimal' })
  bidId!: number;

  @Field(() => Number)
  @Column({ type: 'decimal' })
  askId!: number;

  @Field(() => Number)
  @Column({ type: 'decimal' })
  keebId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
