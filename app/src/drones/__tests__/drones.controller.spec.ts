import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from '../drones.controller';
import { DronesService } from '../drones.service';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { mockDroneRepository } from './utils/drone-repository.mock';

const newDrone: CreateDroneDto = {
  image: 'https://robohash.org/verovoluptatequia.jpg',
  name: 'Suzann',
  address: '955 Springview Junction',
  battery: 70,
  maxSpeed: 11.6,
  averageSpeed: 7.4,
  status: 'success',
};

describe('DronesController', () => {
  let dronesController: DronesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DronesController],
      providers: [
        DronesService,
        {
          provide: 'DroneRepositoryInterface',
          useValue: mockDroneRepository,
        },
      ],
    }).compile();

    dronesController = module.get<DronesController>(DronesController);
  });

  it('should be defined', () => {
    expect(dronesController).toBeDefined();
  });

  it('should run insert successfully', async () => {
    const createdDrone = await dronesController.insert(newDrone);
    expect(createdDrone).toEqual({ ...newDrone, id: 1 });
  });
});
