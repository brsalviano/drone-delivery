import { Drone } from '../drone.entity';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { PaginateDroneDto } from '../dto/paginate-drone.dto';

export interface DroneRepositoryInterface {
  save(createDroneDto: CreateDroneDto): Promise<Drone>;
  getById(id: number): Promise<Drone>;
  delete(id: number): Promise<boolean>;
  paginate(paginateDroneDto: PaginateDroneDto);
}
