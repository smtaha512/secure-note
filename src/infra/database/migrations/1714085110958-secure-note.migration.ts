import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecureNote1714085110958 implements MigrationInterface {
  name = 'SecureNote1714085110958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "secure_note"."secure_note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "note" character varying NOT NULL, CONSTRAINT "PK_2f71aa4b12e97ab8185cd4044a2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "secure_note"."secure_note"`);
  }
}
