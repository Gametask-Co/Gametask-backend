import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingBlockIdField1605627436463
  implements MigrationInterface {
  name = 'CreatingBlockIdField1605627436463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP CONSTRAINT "FK_917f2e7d6374b55b47659e854e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" RENAME COLUMN "blockId" TO "block_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ALTER COLUMN "block_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD CONSTRAINT "FK_554416e6a4bef8384c29b981dd8" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP CONSTRAINT "FK_554416e6a4bef8384c29b981dd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ALTER COLUMN "block_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" RENAME COLUMN "block_id" TO "blockId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD CONSTRAINT "FK_917f2e7d6374b55b47659e854e6" FOREIGN KEY ("blockId") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
