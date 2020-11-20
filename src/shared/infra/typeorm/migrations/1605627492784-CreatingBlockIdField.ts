import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingBlockIdField1605627492784
  implements MigrationInterface {
  name = 'CreatingBlockIdField1605627492784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_508ba49a1bb1c347b36a7fb125d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" RENAME COLUMN "blockId" TO "block_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "block_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_d9d533a418f24b2576b4ca6b6b4" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_d9d533a418f24b2576b4ca6b6b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "block_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" RENAME COLUMN "block_id" TO "blockId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_508ba49a1bb1c347b36a7fb125d" FOREIGN KEY ("blockId") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
