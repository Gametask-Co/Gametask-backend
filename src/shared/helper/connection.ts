import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create(): Promise<void> {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'gametask_db_test',
      dropSchema: true,
      logging: false,
      synchronize: true,
      migrationsRun: false,
      entities: ['./src/modules/*/infra/typeorm/entities/*.ts'],
      migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
      cli: {
        migrationsDir: './src/shared/infra/typeorm/migrations/',
        entitiesDir: './src/modules/*/infra/typeorm/entities/*.ts',
      },
    });
  },

  async close(): Promise<void> {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
  },

  async clear(): Promise<void> {
    const con = getConnection('default');
    const entities = con.entityMetadatas;

    const entityDeletionPromises = entities.map(entity => async () => {
      const repository = con.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    });

    await Promise.all(entityDeletionPromises);
  },
};

export default connection;
