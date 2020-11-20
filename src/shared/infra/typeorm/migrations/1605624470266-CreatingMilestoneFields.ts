import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingMilestoneFields1605624470266
  implements MigrationInterface {
  name = 'CreatingMilestoneFields1605624470266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "milestones" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "milestones" DROP COLUMN "name"`);
  }
}
