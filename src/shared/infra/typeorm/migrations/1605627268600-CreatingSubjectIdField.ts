import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingSubjectIdField1605627268600 implements MigrationInterface {
    name = 'CreatingSubjectIdField1605627268600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "milestones" DROP CONSTRAINT "FK_1e71f634e276a76c02c5769c62a"`);
        await queryRunner.query(`ALTER TABLE "milestones" RENAME COLUMN "subjectId" TO "subject_id"`);
        await queryRunner.query(`ALTER TABLE "milestones" ALTER COLUMN "subject_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "milestones" ADD CONSTRAINT "FK_ec6871d5b9e30ea8415fc7576fe" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "milestones" DROP CONSTRAINT "FK_ec6871d5b9e30ea8415fc7576fe"`);
        await queryRunner.query(`ALTER TABLE "milestones" ALTER COLUMN "subject_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "milestones" RENAME COLUMN "subject_id" TO "subjectId"`);
        await queryRunner.query(`ALTER TABLE "milestones" ADD CONSTRAINT "FK_1e71f634e276a76c02c5769c62a" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
