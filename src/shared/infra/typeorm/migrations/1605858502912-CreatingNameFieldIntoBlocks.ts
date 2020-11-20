import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingNameFieldIntoBlocks1605858502912
  implements MigrationInterface {
  name = 'CreatingNameFieldIntoBlocks1605858502912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocks" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blocks" DROP COLUMN "name"`);
  }
}
