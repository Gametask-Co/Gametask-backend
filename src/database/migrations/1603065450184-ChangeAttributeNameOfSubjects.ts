import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAttributeNameOfSubjects1603065450184 implements MigrationInterface {
    name = 'ChangeAttributeNameOfSubjects1603065450184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects_students_students" ("subjectsId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_dfc83d7e87b6f29a21d530bc5a2" PRIMARY KEY ("subjectsId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_415a19ba92a50b33a3cecb76be" ON "subjects_students_students" ("subjectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d36ae861c4d45d9ba98b42efac" ON "subjects_students_students" ("studentsId") `);
        await queryRunner.query(`ALTER TABLE "subjects_students_students" ADD CONSTRAINT "FK_415a19ba92a50b33a3cecb76bea" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subjects_students_students" ADD CONSTRAINT "FK_d36ae861c4d45d9ba98b42efaca" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects_students_students" DROP CONSTRAINT "FK_d36ae861c4d45d9ba98b42efaca"`);
        await queryRunner.query(`ALTER TABLE "subjects_students_students" DROP CONSTRAINT "FK_415a19ba92a50b33a3cecb76bea"`);
        await queryRunner.query(`DROP INDEX "IDX_d36ae861c4d45d9ba98b42efac"`);
        await queryRunner.query(`DROP INDEX "IDX_415a19ba92a50b33a3cecb76be"`);
        await queryRunner.query(`DROP TABLE "subjects_students_students"`);
    }

}
