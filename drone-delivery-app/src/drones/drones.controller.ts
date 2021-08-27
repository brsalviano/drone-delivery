import {
  Controller,
  ParseIntPipe,
  Body,
  Param,
  Query,
  Get,
  Post,
} from '@nestjs/common';
import { Drone } from './drone.entity';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';

@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @Post()
  insert(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    return this.dronesService.insert(createDroneDto);
  }

  @Get()
  list(@Query() getDronesDto: GetDronesDto): Promise<IPagination<Drone>> {
    return this.dronesService.getDrones(getDronesDto);
  }

  @Get('/:id')
  read(@Param('id', ParseIntPipe) id: number): Promise<Drone> {
    return this.dronesService.getDroneById(id);
  }
}
