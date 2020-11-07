import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AutoGenerateMigration1604251832458
  implements MigrationInterface {
  name = 'AutoGenerateMigration1604251832458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "StudentUser"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "TeacherUser"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "SubjectTeacher"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" RENAME COLUMN "teacher_id" TO "teacherId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "subjects_students_students" ("subjectsId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_dfc83d7e87b6f29a21d530bc5a2" PRIMARY KEY ("subjectsId", "studentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_415a19ba92a50b33a3cecb76be" ON "subjects_students_students" ("subjectsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d36ae861c4d45d9ba98b42efac" ON "subjects_students_students" ("studentsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "UQ_4668d4752e6766682d1be0b346f" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ALTER COLUMN "teacherId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_09338bca25c0e77ea89989dba1d" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects_students_students" ADD CONSTRAINT "FK_415a19ba92a50b33a3cecb76bea" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects_students_students" ADD CONSTRAINT "FK_d36ae861c4d45d9ba98b42efaca" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects_students_students" DROP CONSTRAINT "FK_d36ae861c4d45d9ba98b42efaca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects_students_students" DROP CONSTRAINT "FK_415a19ba92a50b33a3cecb76bea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_09338bca25c0e77ea89989dba1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ALTER COLUMN "teacherId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "UQ_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar_url" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP INDEX "IDX_d36ae861c4d45d9ba98b42efac"`);
    await queryRunner.query(`DROP INDEX "IDX_415a19ba92a50b33a3cecb76be"`);
    await queryRunner.query(`DROP TABLE "subjects_students_students"`);
    await queryRunner.query(
      `ALTER TABLE "subjects" RENAME COLUMN "teacherId" TO "teacher_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "SubjectTeacher" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "TeacherUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "StudentUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
