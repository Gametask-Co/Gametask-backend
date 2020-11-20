import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateMilestoneBlockSubjectClassTask1605624215365
  implements MigrationInterface {
  name = 'CreateMilestoneBlockSubjectClassTask1605624215365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "blockId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subjectclasses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "blockId" uuid, CONSTRAINT "PK_99b08b32c1573bc6a5e4ceb4004" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "milestones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "subjectId" uuid, CONSTRAINT "PK_0bdbfe399c777a6a8520ff902d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "milestoneId" uuid, CONSTRAINT "PK_8244fa1495c4e9222a01059244b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_508ba49a1bb1c347b36a7fb125d" FOREIGN KEY ("blockId") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" ADD CONSTRAINT "FK_917f2e7d6374b55b47659e854e6" FOREIGN KEY ("blockId") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" ADD CONSTRAINT "FK_1e71f634e276a76c02c5769c62a" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" ADD CONSTRAINT "FK_35f29e0bb55afbae93e9f5bb497" FOREIGN KEY ("milestoneId") REFERENCES "milestones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocks" DROP CONSTRAINT "FK_35f29e0bb55afbae93e9f5bb497"`,
    );
    await queryRunner.query(
      `ALTER TABLE "milestones" DROP CONSTRAINT "FK_1e71f634e276a76c02c5769c62a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subjectclasses" DROP CONSTRAINT "FK_917f2e7d6374b55b47659e854e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_508ba49a1bb1c347b36a7fb125d"`,
    );
    await queryRunner.query(`DROP TABLE "blocks"`);
    await queryRunner.query(`DROP TABLE "milestones"`);
    await queryRunner.query(`DROP TABLE "subjectclasses"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
