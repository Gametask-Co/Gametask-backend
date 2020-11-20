import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingTaskFields1605624701726
  implements MigrationInterface {
  name = 'CreatingTaskFields1605624701726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "description" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" ADD "due" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "attachment_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "total_score" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "total_score"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "attachment_url"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "due"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
  }
}
