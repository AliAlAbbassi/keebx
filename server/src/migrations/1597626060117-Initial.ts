import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1597626060117 implements MigrationInterface {
  name = 'Initial1597626060117'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profilePhotoUrl" character varying, "bio" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )

    await queryRunner.query(
      `CREATE TABLE "sales" (
        "salesId" SERIAL NOT NULL,
        "salesPrice" decimal,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("salesId"))`
    )

    await queryRunner.query(
      `CREATE TABLE "keeb" (
        "keebId" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "ticker" character varying NOT NULL,
        "condition" character varying NOT NULL,
        "authenticity" decimal NOT NULL,
        "switches" character varying,
        "lowestAsk" decimal,
        "highestBid" decimal,
        "lastSale" decimal,
        "salesId" SERIAL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        UNIQUE ("title"),
        UNIQUE ("ticker"),
        PRIMARY KEY ("keebId"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "keeb"`)
    await queryRunner.query(`DROP TABLE "sales"`)
  }
}
