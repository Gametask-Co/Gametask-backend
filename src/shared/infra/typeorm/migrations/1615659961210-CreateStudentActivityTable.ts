import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStudentActivityTable1615659961210 implements MigrationInterface {
    name = 'CreateStudentActivityTable1615659961210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" uuid NOT NULL, "subject_id" uuid NOT NULL, "milestone_id" uuid NOT NULL, "block_id" uuid NOT NULL, "subjectclass_id" uuid, "task_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dfda224476718bb7e099889b930" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student_activity" ADD CONSTRAINT "FK_ed60060ed5770d94d422a638506" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_activity" ADD CONSTRAINT "FK_506295beaabebe83e115b284fee" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_activity" ADD CONSTRAINT "FK_5aa4d064242ccbe68fbd07888e7" FOREIGN KEY ("milestone_id") REFERENCES "milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_activity" ADD CONSTRAINT "FK_98b1badc39b79aadb35ee91fbca" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_activity" ADD CONSTRAINT "FK_0b036c9b075ae3ad8baf47c4667" FOREIGN KEY ("subjectclass_id") REFERENCES "subjectclasses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_activity" ADD CONSTRAINT "FK_e0de2420659792e98e71b78933b" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_activity" DROP CONSTRAINT "FK_e0de2420659792e98e71b78933b"`);
        await queryRunner.query(`ALTER TABLE "student_activity" DROP CONSTRAINT "FK_0b036c9b075ae3ad8baf47c4667"`);
        await queryRunner.query(`ALTER TABLE "student_activity" DROP CONSTRAINT "FK_98b1badc39b79aadb35ee91fbca"`);
        await queryRunner.query(`ALTER TABLE "student_activity" DROP CONSTRAINT "FK_5aa4d064242ccbe68fbd07888e7"`);
        await queryRunner.query(`ALTER TABLE "student_activity" DROP CONSTRAINT "FK_506295beaabebe83e115b284fee"`);
        await queryRunner.query(`ALTER TABLE "student_activity" DROP CONSTRAINT "FK_ed60060ed5770d94d422a638506"`);
        await queryRunner.query(`DROP TABLE "student_activity"`);
    }

}
