import { Drone } from '../drone.entity';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { GetDronesDto } from '../dto/get-drones.dto';
import { IPagination } from './pagination.interface';

export interface DroneRepositoryInterface {
  save(createDroneDto: CreateDroneDto): Promise<Drone>;
  paginateDrones(getDronesDto: GetDronesDto): Promise<IPagination<Drone>>;
  getById(id: number): Promise<Drone>;
  delete(id: number): Promise<boolean>;
  // findMany();
}
