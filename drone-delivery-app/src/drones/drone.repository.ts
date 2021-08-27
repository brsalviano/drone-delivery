import {
  EntityRepository,
  Equal,
  FindConditions,
  Like,
  Repository,
} from 'typeorm';
import { Drone } from './drone.entity';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';

@EntityRepository(Drone)
export class DroneRepository extends Repository<Drone> {
  async paginateDrones(
    getDronesDto: GetDronesDto,
  ): Promise<IPagination<Drone>> {
    const { take, skip, page } = this.preparePagination(getDronesDto);
    const sort = this.prepareSort(getDronesDto);
    const filters = this.prepareFilters(getDronesDto);

    const [drones, total] = await this.findAndCount({
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
