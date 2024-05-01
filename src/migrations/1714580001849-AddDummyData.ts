import { MigrationInterface, QueryRunner } from "typeorm";
import { generateSaltAndHash } from "./../utils";

export class AddDummyData1714580001849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const hash = await generateSaltAndHash('123456789')

        await queryRunner.query(`insert into "user" (role, email, salt, password_hash, name) values 
            ('ADMIN', 'shiv@google.com', '${hash.salt}', '${hash.passwordHash}', 'shiv')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE email = 'shiv@google.com'`);
    }

}
