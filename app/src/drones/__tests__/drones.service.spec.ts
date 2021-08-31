import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DronesService } from '../drones.service';
import { DroneRepository } from '../drone.repository';

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
          provide: getRepositoryToken(DroneRepository),
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
