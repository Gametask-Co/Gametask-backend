import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToStudentAndTeacher1606869185303 implements MigrationInterface {
    name = 'AddNameToStudentAndTeacher1606869185303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "name"`);
    }

}
