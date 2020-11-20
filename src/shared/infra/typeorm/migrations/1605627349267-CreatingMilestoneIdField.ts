import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingMilestoneIdField1605627349267
  implements MigrationInterface {
  name = 'CreatingMilestoneIdField1605627349267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocks" DROP CONSTRAINT "FK_35f29e0bb55afbae93e9f5bb497"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" RENAME COLUMN "milestoneId" TO "milestone_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" ALTER COLUMN "milestone_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" ADD CONSTRAINT "FK_c3c7a1c8d0dbd7c6575528aa54c" FOREIGN KEY ("milestone_id") REFERENCES "milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocks" DROP CONSTRAINT "FK_c3c7a1c8d0dbd7c6575528aa54c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" ALTER COLUMN "milestone_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" RENAME COLUMN "milestone_id" TO "milestoneId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" ADD CONSTRAINT "FK_35f29e0bb55afbae93e9f5bb497" FOREIGN KEY ("milestoneId") REFERENCES "milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
