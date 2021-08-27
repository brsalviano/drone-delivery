import { Body, Controller, Post } from '@nestjs/common';
import { Drone } from './drone.entity';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';

@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @Post()
  insert(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    return this.dronesService.insert(createDroneDto);
  }
}
