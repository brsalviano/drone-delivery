import {
  AbstractRepository,
  DeepPartial,
  EntityRepository,
  Equal,
  FindConditions,
  Like,
} from 'typeorm';
import { Drone } from './drone.entity';
import { DroneRepositoryInterface } from './interfaces/drone.repository.interface';
import { CreateDroneDto } from './dto/create-drone.dto';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';
import { Injectable } from '@nestjs/common';

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

  async paginateDrones(
    getDronesDto: GetDronesDto,
  ): Promise<IPagination<Drone>> {
    const { take, skip, page } = this.preparePagination(getDronesDto);
    const sort = this.prepareSort(getDronesDto);
    const filters = this.prepareFilters(getDronesDto);

    const [drones, total] = await this.repository.findAndCount({
      where: filters,
      take,
      skip,
      order: sort,
    });

    return this.paginationResponse(drones, total, page, take);
  }

  private preparePagination(getDronesDto): {
    take: number;
    page: number;
    skip: number;
  } {
    const take = this.checkAndParseMinNumber(getDronesDto._limit, 1, 20);
    const page = this.checkAndParseMinNumber(getDronesDto._page, 1, 1);
    const skip = (page - 1) * take;

    return {
      take,
      page,
      skip,
    };
  }

  private checkAndParseMinNumber(
    value: string,
    minNumber: number,
    defaultValue: number,
  ): number {
    let parsedValue = value ? Number(value) : defaultValue;

    if (parsedValue < minNumber) {
      parsedValue = defaultValue;
    }
    return parsedValue;
  }

  private prepareSort(getDronesDto: GetDronesDto): { [key: string]: string } {
    const { _sort = 'id', _order = 'ASC' } = getDronesDto;

    const order = {};
    order[_sort] = _order.toUpperCase();
    return order;
  }

  private prepareFilters(
    getDronesDto: GetDronesDto,
  ): FindConditions<GetDronesDto> {
    const { name = '', status = '' } = getDronesDto;

    const where = {};

    if (name) {
      where['name'] = Like(`%${name}%`);
    }

    if (status) {
      where['status'] = Equal(status);
    }

    return where;
  }

  private paginationResponse(
    drones: Drone[],
    total: number,
    page: number,
    take: number,
  ): IPagination<Drone> {
    return {
      data: drones,
      totalItems: total,
      currentPage: page,
      itemsPerPage: take,
      totalPages: Math.ceil(total / take),
    };
  }
}
