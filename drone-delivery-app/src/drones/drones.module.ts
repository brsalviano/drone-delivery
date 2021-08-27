import { Module } from '@nestjs/common';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneRepository } from './drone.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DroneRepository])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
