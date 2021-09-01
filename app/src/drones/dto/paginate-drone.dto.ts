import { Allow } from 'class-validator';

export class PaginateDroneDto {
  @Allow()
  _page?: number;

  @Allow()
  _limit?: number;

  @Allow()
  _sort?: string;

  @Allow()
  _order?: string;

  @Allow()
  name?: string;

  @Allow()
  status?: string;
}
