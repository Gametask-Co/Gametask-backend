import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStudentAndTeacherIdToUser1606866262919 implements MigrationInterface {
    name = 'AddStudentAndTeacherIdToUser1606866262919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "teacher_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_6732917f537f13ea6555a8b493e" UNIQUE ("teacher_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "student_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_4bcc4fd204f448ad671c0747ab4" UNIQUE ("student_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6732917f537f13ea6555a8b493e" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4bcc4fd204f448ad671c0747ab4" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4bcc4fd204f448ad671c0747ab4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6732917f537f13ea6555a8b493e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_4bcc4fd204f448ad671c0747ab4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6732917f537f13ea6555a8b493e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "teacher_id"`);
    }

}
