import { MigrationInterface, QueryRunner } from 'typeorm'

// you need to fix the queries if you're going to use this migration
export class Initial1597626060117 implements MigrationInterface {
  name = 'Initial1597626060117'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "profilePhotoUrl" text, "bio" text, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "keeb" ("id" SERIAL NOT NULL, "title" text NOT NULL, "ticker" text NOT NULL, "condition" integer NOT NULL, "authenticity" numeric NOT NULL, "switches" text NOT NULL, "bids" numeric array NOT NULL, "asks" numeric array NOT NULL, "sales" numeric array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d8b9e1bfe2225af90efa33f4a5e" UNIQUE ("title"), CONSTRAINT "UQ_d46b44f5a6c4400c87192aef939" UNIQUE ("ticker"), CONSTRAINT "PK_b2b4e4a6a9eb2ff13115a48a8d0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "bid" ("bidId" SERIAL NOT NULL, "bidPrice" decimal NOT NULL, "ticker" text NOT NULL, "userId" decimal NOT NULL, "keebId" decimal NOT NULL, "title" text NOT NULL, "isValid" boolean , "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d8b9e1bfe2225af90efa33f4a5e" UNIQUE ("title"), CONSTRAINT "UQ_d46b44f5a6c4400c87192aef939" UNIQUE ("ticker"), CONSTRAINT "PK_b2b4e4a6a9eb2ff13115a48a8d0" PRIMARY KEY ("id"))`
    )
    // await queryRunner.query(
    //   `CREATE TABLE "ask" ("bidId" SERIAL NOT NULL, "bidPrice" decimal NOT NULL, "ticker" text NOT NULL, "userId" decimal NOT NULL, "keebId" decimal NOT NULL, "title" text NOT NULL, "isValid" boolean , "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d8b9e1bfe2225af90efa33f4a5e" UNIQUE ("title"), CONSTRAINT "UQ_d46b44f5a6c4400c87192aef939" UNIQUE ("ticker"), CONSTRAINT "PK_b2b4e4a6a9eb2ff13115a48a8d0" PRIMARY KEY ("id"))`
    // )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "keeb"`)
    await queryRunner.query(`DROP TABLE "bid"`)
    await queryRunner.query(`DROP TABLE "ask"`)
  }
}
