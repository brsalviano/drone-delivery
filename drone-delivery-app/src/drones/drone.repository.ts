import { EntityRepository, Repository } from 'typeorm';
import { Drone } from './drone.entity';

@EntityRepository(Drone)
export class DroneRepository extends Repository<Drone> {}
