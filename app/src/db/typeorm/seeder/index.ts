import { createConnection } from 'typeorm';
import config from '../ormconfig';
import { DroneFactory } from './factory/drone.factory';
import { DroneSeeder } from './seeds/drone.seeder';

async function runSeeder() {
  const configWithEntites = Object.assign(config(), {
    entities: ['src/**/*.entity.ts'],
  });
  const databaseConnection = await createConnection(configWithEntites);
  const droneSeeder = new DroneSeeder(databaseConnection);

  await droneSeeder.execute(new DroneFactory().create(100));

  databaseConnection.close();
}

runSeeder();
