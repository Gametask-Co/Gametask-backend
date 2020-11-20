import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingTeacherIdField1605627031705
  implements MigrationInterface {
  name = 'CreatingTeacherIdField1605627031705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_09338bca25c0e77ea89989dba1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" RENAME COLUMN "teacherId" TO "teacher_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ALTER COLUMN "teacher_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_b0ee519d18901072d85961b2652" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_b0ee519d18901072d85961b2652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ALTER COLUMN "teacher_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" RENAME COLUMN "teacher_id" TO "teacherId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_09338bca25c0e77ea89989dba1d" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
