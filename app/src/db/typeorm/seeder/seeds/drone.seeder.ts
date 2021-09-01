import { Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Drone } from '../../../../drones/drone.entity';
import { SeedInterface } from '../seed.interface';

/**
 * Seeder for drones
 */
export class DroneSeeder implements SeedInterface<Drone> {
  constructor(private connection: Connection) {}

  /**
   * @param drones A list with drones to be saved into your database.
   */
  async execute(drones: Drone[]) {
    const logger = new Logger('DroneSeederLogger');
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(Drone)
      .values(drones)
      .execute();
    logger.log(
      `${drones.length} drones foram adicionados no banco e estão prontos para as entregas! ;)`,
    );
  }
}
