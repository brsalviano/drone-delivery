import { Module } from '@nestjs/common';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneRepositoryImplTypeorm } from './drone.repository';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DroneRepositoryImplTypeorm])],
  controllers: [DronesController],
  providers: [
    DronesService,
    {
      provide: 'DroneRepositoryInterface',
      useFactory: (connection: Connection) => {
        return connection.getCustomRepository(DroneRepositoryImplTypeorm);
      },
      inject: [Connection],
    },
  ],
})
export class DronesModule {}
