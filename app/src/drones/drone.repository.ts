import { AbstractRepository, DeepPartial, EntityRepository } from 'typeorm';
import { Drone } from './drone.entity';
import { DroneRepositoryInterface } from './interfaces/drone.repository.interface';
import { CreateDroneDto } from './dto/create-drone.dto';
import { Injectable } from '@nestjs/common';
import { MapPaginationQueryTypeorm } from './utils/map-pagination-query-typeorm';
import { Page } from './utils/page';
import { PaginateDroneDto } from './dto/paginate-drone.dto';

@Injectable()
@EntityRepository(Drone)
export class DroneRepositoryImplTypeorm
  extends AbstractRepository<Drone>
  implements DroneRepositoryInterface
{
  async save(createDroneDto: CreateDroneDto): Promise<Drone> {
    const partial: DeepPartial<Drone> = { ...createDroneDto };
    const drone = this.repository.create(partial);
    await this.repository.save(drone);
    return drone;
  }

  async getById(id: number): Promise<Drone> {
    return await this.repository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }

  async paginate(paginateDroneDto: PaginateDroneDto): Promise<Page<Drone>> {
    const mapper = new MapPaginationQueryTypeorm(paginateDroneDto);
    const queryOptions = mapper.getMappedQuery();

    const [drones, total] = await this.repository.findAndCount(queryOptions);

    const { itemsPerPage, currentPage } = mapper.getMappedPageMetadata();

    const page = new Page<Drone>(total, drones, itemsPerPage, currentPage);

    return page;
  }
}
