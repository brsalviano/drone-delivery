/**
 * Configurações de conexão do typeorm
 */
import { ConnectionOptions } from 'typeorm';

const config = (): ConnectionOptions => {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/db/typeorm/migrations',
    },
  };
};

export = config;
