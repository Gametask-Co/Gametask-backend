import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingSubjectClassFields1605624804251
  implements MigrationInterface {
  name = 'CreatingSubjectClassFields1605624804251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD "attachment_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP COLUMN "attachment_url"`,
    );
    await queryRunner.query(`ALTER TABLE "subjectclasses" DROP COLUMN "name"`);
  }
}
