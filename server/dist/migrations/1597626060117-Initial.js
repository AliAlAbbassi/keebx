"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1597626060117 = void 0;
class Initial1597626060117 {
    constructor() {
        this.name = 'Initial1597626060117';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profilePhotoUrl" character varying, "bio" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "sales" (
        "salesId" SERIAL NOT NULL,
        "salesPrice" decimal,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("salesId"))`);
            yield queryRunner.query(`CREATE TABLE "keeb" (
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
        PRIMARY KEY ("keebId"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "keeb"`);
            yield queryRunner.query(`DROP TABLE "sales"`);
        });
    }
}
exports.Initial1597626060117 = Initial1597626060117;
//# sourceMappingURL=1597626060117-Initial.js.map