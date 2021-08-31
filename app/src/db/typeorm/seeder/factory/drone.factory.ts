import * as faker from 'faker';
import { FactoryInterface } from '../../../../db/typeorm/seeder/interfaces/factory.interface';
import { Drone } from '../../../../drones/drone.entity';
/*
 * Class for create drones.
 */
export class DroneFactory implements FactoryInterface<Drone> {
  /**
   * @param amount The amount of drones to be created
   * @returns An array with the created drones
   */
  create(amount: number): Drone[] {
    const drones: Drone[] = [];

    for (let i = 0; i < amount; i++) {
      const drone = new Drone();
      drone.image = faker.image.imageUrl();
      drone.name = faker.name.findName();
      drone.address = faker.address.streetAddress();
      drone.battery = faker.datatype.number({ min: 0, max: 100 });
      drone.maxSpeed = faker.datatype.number({
        min: 0,
        max: 99,
        precision: 1,
      });
      drone.averageSpeed = faker.datatype.number({
        min: 0,
        max: 99,
        precision: 1,
      });
      drone.status = faker.helpers.shuffle(['success', 'failed'])[0];

      drones.push(drone);
    }

    return drones;
  }
}
