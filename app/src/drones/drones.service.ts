import { Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { Drone } from './drone.entity';
import { DroneRepository } from './drone.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateDroneDto } from './dto/update-drone.dto';

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

  async getDroneById(id: number): Promise<Drone> {
    const foundDrone = await this.droneRepository.findOne(id);

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

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Drone with id ${id} not found`);
    }
  }
}
