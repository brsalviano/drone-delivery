import { FindConditions, Like, Equal, FindManyOptions } from 'typeorm';
import { PaginateDroneDto } from '../dto/paginate-drone.dto';

export class MapPaginationQueryTypeorm {
  private take: number;
  private page: number;
  private skip: number;
  private order: { [key: string]: 1 | 'ASC' | 'DESC' | -1 };
  private where: FindConditions<PaginateDroneDto>;

  constructor(paginateDroneDto: PaginateDroneDto) {
    this.mapPagination(paginateDroneDto);
    this.mapSort(paginateDroneDto);
    this.mapFilters(paginateDroneDto);
  }

  getMappedQuery(): FindManyOptions {
    return {
      where: this.where,
      take: this.take,
      skip: this.skip,
      order: this.order,
    };
  }

  getMappedPageMetadata() {
    return {
      itemsPerPage: this.take,
      currentPage: this.page,
    };
  }

  private mapPagination(paginateDroneDto: PaginateDroneDto) {
    this.take = Number(this.applyMinValueRule(paginateDroneDto._limit, 1, 20));
    this.page = Number(this.applyMinValueRule(paginateDroneDto._page, 1, 1));
    this.skip = (this.page - 1) * this.take;
  }

  private mapSort(paginateDroneDto: PaginateDroneDto) {
    const { _sort = 'id', _order = 'ASC' } = paginateDroneDto;

    const order = {};
    order[_sort] = _order.toUpperCase();
    this.order = order;
  }

  private mapFilters(paginateDroneDto: PaginateDroneDto) {
    const { name = '', status = '' } = paginateDroneDto;

    const where = {};

    if (name) {
      where['name'] = Like(`%${name}%`);
    }

    if (status) {
      const mappedStatus = status == 'fail' ? 'failed' : status;
      where['status'] = Equal(mappedStatus);
    }

    this.where = where;
  }

  /**
   * @param field The field to be evaluated
   * @param min the min accepted
   * @param defaultValue the default value to be returned if the field is less than min
   * @returns the result number after check
   */
  private applyMinValueRule(
    field: number,
    min: number,
    defaultValue: number,
  ): number {
    return field >= min ? field : defaultValue;
  }
}
