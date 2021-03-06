import { Test, TestingModule } from '@nestjs/testing';
import { DronesService } from '../drones.service';

describe('DronesService', () => {
  let service: DronesService;

  const mockDroneRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DronesService,
        {
          provide: 'DroneRepositoryInterface',
          useValue: mockDroneRepository,
        },
      ],
    }).compile();

    service = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
