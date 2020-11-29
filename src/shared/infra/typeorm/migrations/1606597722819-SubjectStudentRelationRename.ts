import {MigrationInterface, QueryRunner} from "typeorm";

export class SubjectStudentRelationRename1606597722819 implements MigrationInterface {
    name = 'SubjectStudentRelationRename1606597722819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects_students" ("subject_id" uuid NOT NULL, "student_id" uuid NOT NULL, CONSTRAINT "PK_fb61544a4bc155a6ef5a4883cb5" PRIMARY KEY ("subject_id", "student_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ee631d1680c96ab71ef56a2dab" ON "subjects_students" ("subject_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c9ec93e99f0a2b2da9fb085a7" ON "subjects_students" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "subjects_students" ADD CONSTRAINT "FK_ee631d1680c96ab71ef56a2dabc" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subjects_students" ADD CONSTRAINT "FK_4c9ec93e99f0a2b2da9fb085a72" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects_students" DROP CONSTRAINT "FK_4c9ec93e99f0a2b2da9fb085a72"`);
        await queryRunner.query(`ALTER TABLE "subjects_students" DROP CONSTRAINT "FK_ee631d1680c96ab71ef56a2dabc"`);
        await queryRunner.query(`DROP INDEX "IDX_4c9ec93e99f0a2b2da9fb085a7"`);
        await queryRunner.query(`DROP INDEX "IDX_ee631d1680c96ab71ef56a2dab"`);
        await queryRunner.query(`DROP TABLE "subjects_students"`);
    }

}
