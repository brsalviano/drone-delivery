import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Drone1630024431072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'drones',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'battery',
            type: 'int(3)',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'max_speed',
            type: 'float(4,2)',
            isNullable: false,
          },
          {
            name: 'average_speed',
            type: 'float(4,2)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['success', 'failed'],
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('drones');
  }
}
