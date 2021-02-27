import { MigrationInterface, QueryRunner } from 'typeorm';

export default class isVisibleFieldInMilestones1614429852434
  implements MigrationInterface {
  name = 'isVisibleFieldInMilestones1614429852434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD "isVisible" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "milestones" DROP COLUMN "isVisible"`);
  }
}
