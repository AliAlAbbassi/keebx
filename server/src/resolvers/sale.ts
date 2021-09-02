import { Sale } from '../entities/Sale'
import { saleInput } from '../options'
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'

@ObjectType()
class saleFieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class saleResponse {
  @Field(() => [saleFieldError], { nullable: true })
  errors?: saleFieldError[]

  @Field(() => Sale, { nullable: true })
  sale?: Sale
}

@Resolver(Sale)
export class saleResolver {
  @Mutation(() => saleResponse)
  async createSale(
    @Arg('options') options: saleInput
    // @Ctx() { req }: MyContext
  ): Promise<saleResponse> {
    let sale

    try {
      // sale = await sale.create(options).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Sale)
        .values([options])
        .execute()
      sale = result.raw[0]
      console.log(sale)
    } catch (error) {
      return {
        errors: [
          {
            field: 'sale',
            message: 'bad error',
          },
        ],
      }
    }

    return { sale }
  }

  @Query(() => [Sale], { nullable: true })
  async sales(@Arg('keebId') keebId: number) {
    const sales = await getConnection()
      .getRepository(Sale)
      .createQueryBuilder('sale')
      .where('sale.keebId = :keebId', { keebId })
      .getMany()

    return sales
  }

  @Query(() => Sale, { nullable: true })
  async lastSale(@Arg('keebId') keebId: number) {
    const lastSale = await getConnection()
      .getRepository(Sale)
      .createQueryBuilder('sale')
      .where('sale.keebId = :keebId', { keebId })
      .orderBy('sale.createdAt', 'DESC')
      .limit(1)
      .getOne()

    return lastSale
  }

  @Query(() => Sale, { nullable: true })
  async sale(@Arg('saleId') saleId: number) {
    const sale = await getConnection()
      .getRepository(Sale)
      .createQueryBuilder('sale')
      .where('sale.saleId = :saleId', { saleId })
      .getOne()

    return sale
  }

  @Mutation(() => saleResponse)
  async deleteSale(@Arg('saleId') saleId: number) {
    let sale
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Sale)
        .where('saleId = :saleId', { saleId })
        .execute()

      sale = result.raw[0]
    } catch (error) {
      return {
        errors: [
          {
            field: 'sale',
            message: 'bad error',
          },
        ],
      }
    }
    return { sale }
  }
}
