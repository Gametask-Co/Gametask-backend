import { MigrationInterface, QueryRunner } from 'typeorm';

export default class deadlineFieldInMilestones1614443236651
  implements MigrationInterface {
  name = 'deadlineFieldInMilestones1614443236651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD "deadline" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "milestones" DROP COLUMN "deadline"`);
  }
}
