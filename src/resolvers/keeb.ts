import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Keeb } from '../entities/Keeb';
import { KeebOptions, updateKeebOptions } from '../options';
import { validateKeebOptions } from '../utils/validateKeebOptions';

@ObjectType()
class KeebFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class KeebResponse {
  @Field(() => [KeebFieldError], { nullable: true })
  errors?: KeebFieldError[];

  @Field(() => [Keeb], { nullable: true })
  keebs?: Keeb[];

  @Field(() => Keeb, { nullable: true })
  keeb?: Keeb;
}

@Resolver(Keeb)
export class KeebResolver {
  keebRepo = AppDataSource.getRepository(Keeb);

  @Query(() => Keeb, { nullable: true })
  async keeb(@Arg('keebId') keebId: number) {
    return await Keeb.findOneBy({ id: keebId });
  }

  @Query(() => [Keeb], { nullable: true })
  async keebs() {
    return await Keeb.find();
  }

  @Query(() => [Keeb], { nullable: true })
  async keebsWithPagination(
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
    const keebs = await getConnection()
      .createQueryBuilder()
      .select('keeb')
      .from(Keeb, 'keeb')
      .limit(limit)
      .offset(offset)
      .getMany();

    return keebs;
  }

  @Mutation(() => KeebResponse)
  async createKeeb(
    @Arg('options') options: KeebOptions
  ): Promise<KeebResponse> {
    let keeb;

    const errors = validateKeebOptions(options);
    if (errors) {
      return { errors };
    }

    try {
      this.keebRepo.create(options).save();
    } catch (error) {
      return {
        errors: [
          {
            field: 'keeb',
            message: 'Keeb options got a problem',
          },
        ],
      };
    }
    return { keeb };
  }

  @Mutation(() => KeebResponse)
  async updateKeeb(
    @Arg('updateOptions') updateOptions: updateKeebOptions,
    @Arg('id') id: number
  ): Promise<KeebResponse> {
    let keeb;
    try {
      const result = await AppDataSource.createQueryBuilder()
        .update(Keeb)
        .set(updateOptions)
        .where('id = :id', { id })
        .execute();

      keeb = result.raw[0];
    } catch (error) {
      return {
        errors: [
          {
            field: 'keeb',
            message: 'bad error',
          },
        ],
      };
    }
    return { keeb };
  }

  @Mutation(() => KeebResponse)
  async deleteKeeb(@Arg('id') id: number): Promise<KeebResponse> {
    let keeb;
    try {
      const result = await AppDataSource.createQueryBuilder()
        .delete()
        .from(Keeb)
        .where('id = :id', { id })
        .execute();

      keeb = result.raw[0];
    } catch (error) {
      return {
        errors: [
          {
            field: 'keeb',
            message: 'bad error',
          },
        ],
      };
    }
    return { keeb };
  }
}
