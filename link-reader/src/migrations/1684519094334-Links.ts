import { MigrationInterface, QueryRunner } from 'typeorm';

export class Links1684519094334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE Link (
                id INT auto_increment NULL,
                links varchar(100) NULL,
                CONSTRAINT Link_pk PRIMARY KEY (id)
            );
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE Link;`);
  }
}
