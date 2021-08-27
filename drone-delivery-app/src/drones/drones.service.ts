import { Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { Drone } from './drone.entity';
import { DroneRepository } from './drone.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(DroneRepository)
    private droneRepository: DroneRepository,
  ) {}

  async insert(createDroneDto: CreateDroneDto): Promise<Drone> {
    const partial: DeepPartial<Drone> = { ...createDroneDto };
    const drone = this.droneRepository.create(partial);
    await this.droneRepository.save(drone);
    return drone;
  }

  getDrones(getDronesDto: GetDronesDto): Promise<IPagination<Drone>> {
    return this.droneRepository.paginateDrones(getDronesDto);
  }
}
