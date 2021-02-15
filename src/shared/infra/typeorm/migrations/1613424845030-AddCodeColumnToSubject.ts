import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCodeColumnToSubject1613424845030 implements MigrationInterface {
    name = 'AddCodeColumnToSubject1613424845030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" ADD "code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "code"`);
    }

}
