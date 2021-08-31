import {
  Controller,
  ParseIntPipe,
  Body,
  Param,
  Query,
  Get,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { Drone } from './drone.entity';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { GetDronesDto } from './dto/get-drones.dto';
import { IPagination } from './interfaces/pagination.interface';
import { UpdateDroneDto } from './dto/update-drone.dto';

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

  @Put('/:id')
  updateDrone(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    return this.dronesService.updateDrone(updateDroneDto, id);
  }

  @Delete('/:id')
  deleteDrone(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.dronesService.deleteDrone(id);
  }
}
