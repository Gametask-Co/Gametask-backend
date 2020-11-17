import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingFieldToBackgroundImageInSubjects1605624342405 implements MigrationInterface {
    name = 'CreatingFieldToBackgroundImageInSubjects1605624342405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" ADD "background_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "background_url"`);
    }

}
