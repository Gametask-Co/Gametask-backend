import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InitialMigration1603065160729
  implements MigrationInterface {
  name = 'InitialMigration1603065160729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "TeacherUser"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "StudentUser"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "SubjectTeacher"`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" DROP CONSTRAINT "MilestoneSubject"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP CONSTRAINT "SubjectClassMilestone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "TaskMilestone"`,
    );
    await queryRunner.query(
      `CREATE TABLE "subjects_students_id_students" ("subjectsId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_2bab0886e7bd6a74a38d13a38af" PRIMARY KEY ("subjectsId", "studentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6dcefe7422b525f0fcc5be25fa" ON "subjects_students_id_students" ("subjectsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1b302f98402c215fcd42d4732" ON "subjects_students_id_students" ("studentsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "UQ_4668d4752e6766682d1be0b346f" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "UQ_b0ee519d18901072d85961b2652" UNIQUE ("teacher_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD CONSTRAINT "UQ_ec6871d5b9e30ea8415fc7576fe" UNIQUE ("subject_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD CONSTRAINT "UQ_f5663784d9db8bf1f57ba46b9c1" UNIQUE ("milestone_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ALTER COLUMN "attachment" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "UQ_39abeb50240a7312a00786c9b24" UNIQUE ("milestone_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "attachment" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "due" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "FK_b0ee519d18901072d85961b2652" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD CONSTRAINT "FK_ec6871d5b9e30ea8415fc7576fe" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD CONSTRAINT "FK_f5663784d9db8bf1f57ba46b9c1" FOREIGN KEY ("milestone_id") REFERENCES "milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_39abeb50240a7312a00786c9b24" FOREIGN KEY ("milestone_id") REFERENCES "milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects_students_id_students" ADD CONSTRAINT "FK_6dcefe7422b525f0fcc5be25fa0" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects_students_id_students" ADD CONSTRAINT "FK_a1b302f98402c215fcd42d47326" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects_students_id_students" DROP CONSTRAINT "FK_a1b302f98402c215fcd42d47326"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects_students_id_students" DROP CONSTRAINT "FK_6dcefe7422b525f0fcc5be25fa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_39abeb50240a7312a00786c9b24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP CONSTRAINT "FK_f5663784d9db8bf1f57ba46b9c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" DROP CONSTRAINT "FK_ec6871d5b9e30ea8415fc7576fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "FK_b0ee519d18901072d85961b2652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "due" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "attachment" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "UQ_39abeb50240a7312a00786c9b24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ALTER COLUMN "attachment" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP CONSTRAINT "UQ_f5663784d9db8bf1f57ba46b9c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" DROP CONSTRAINT "UQ_ec6871d5b9e30ea8415fc7576fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" DROP CONSTRAINT "UQ_b0ee519d18901072d85961b2652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "UQ_4668d4752e6766682d1be0b346f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar_url" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP INDEX "IDX_a1b302f98402c215fcd42d4732"`);
    await queryRunner.query(`DROP INDEX "IDX_6dcefe7422b525f0fcc5be25fa"`);
    await queryRunner.query(`DROP TABLE "subjects_students_id_students"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "TaskMilestone" FOREIGN KEY ("milestone_id") REFERENCES "milestones"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD CONSTRAINT "SubjectClassMilestone" FOREIGN KEY ("milestone_id") REFERENCES "milestones"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD CONSTRAINT "MilestoneSubject" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD CONSTRAINT "SubjectTeacher" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "StudentUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "TeacherUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
