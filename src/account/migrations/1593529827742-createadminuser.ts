import { MigrationInterface, QueryRunner } from 'typeorm';

export class createadminuser1593529827742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "adminUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(128) NOT NULL, CONSTRAINT "PK_f155e50a944f2658dc1ccb477a2" PRIMARY KEY ("id"), CONSTRAINT "UQ_58bd2b086488ba1ba90847a192e" UNIQUE ("username"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "adminUser"`);
  }
}
