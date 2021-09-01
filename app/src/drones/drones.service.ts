import { Inject, Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { Drone } from './drone.entity';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { DroneRepositoryInterface } from './interfaces/drone.repository.interface';

@Injectable()
export class DronesService {
  constructor(
    @Inject('DroneRepositoryInterface')
    private droneRepository: DroneRepositoryInterface,
  ) {}

  async insert(createDroneDto: CreateDroneDto): Promise<Drone> {
    const drone = await this.droneRepository.save(createDroneDto);
    return drone;
  }

  getDrones(getDronesDto: GetDronesDto): Promise<IPagination<Drone>> {
    return this.droneRepository.paginateDrones(getDronesDto);
  }

  async getDroneById(id: number): Promise<Drone> {
    const foundDrone = await this.droneRepository.getById(id);

    if (!foundDrone) {
      throw new NotFoundException(`Drone with id ${id} not found`);
    }

    return foundDrone;
  }

  async updateDrone(
    updateDroneDto: UpdateDroneDto,
    id: number,
  ): Promise<Drone> {
    const drone = await this.getDroneById(id);
    for (const key of Object.keys(updateDroneDto)) {
      drone[key] = updateDroneDto[key];
    }
    this.droneRepository.save(drone);
    return drone;
  }

  async deleteDrone(id: number): Promise<void> {
    const deleteResult = await this.droneRepository.delete(id);

    if (!deleteResult) {
      throw new NotFoundException(`Drone with id ${id} not found`);
    }
  }
}
