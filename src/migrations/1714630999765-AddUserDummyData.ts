import { MigrationInterface, QueryRunner } from 'typeorm';
import { generateSaltAndHash } from '../utils';

export class AddUserDummyData1714630999765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hash = await generateSaltAndHash('123456789');

    await queryRunner.query(`insert into "user" (role, email, salt, password_hash, name) values 
            ('ADMIN', 'shiv@google.com', '${hash.salt}', '${hash.passwordHash}', 'shiv')
        `);

    await queryRunner.query(`insert into "user" (role, email, salt, password_hash, name) values 
        
        ('USER', 'shiv123@google.com', '${hash.salt}', '${hash.passwordHash}', 'shiv')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'shiv123@google.com'`,
    );
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'shiv@google.com'`,
    );
  }
}
