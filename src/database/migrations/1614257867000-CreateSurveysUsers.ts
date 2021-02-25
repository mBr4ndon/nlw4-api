import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614257867000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar(36)',
                        isPrimary: true
                    },
                    {
                        name: 'user_id',
                        type: 'varchar(36)'
                    },
                    {
                        name: 'survey_id',
                        type: 'varchar(36)'
                    },
                    {
                        name: 'value',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fkSurveysUsersUserId',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'fkSurveysUsersSurveyId',
                        referencedTableName: 'surveys',
                        referencedColumnNames: ['id'],
                        columnNames: ['survey_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_users')
    }

}
