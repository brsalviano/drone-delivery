import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from '../drones.controller';
import { DronesService } from '../drones.service';
import { CreateDroneDto } from '../dto/create-drone.dto';

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
  let dronesService: DronesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DronesController],
      providers: [
        {
          provide: DronesService,
          useValue: {
            insert: jest.fn().mockResolvedValue({ ...newDrone, id: 1 }),
          },
        },
      ],
    }).compile();

    dronesController = module.get<DronesController>(DronesController);
    dronesService = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(dronesController).toBeDefined();
  });

  it('should run insert successfully', async () => {
    const createdDrone = await dronesController.insert(newDrone);
    expect(createdDrone).toEqual({ ...newDrone, id: 1 });
  });
});
