import { DroneRepositoryInterface } from '../../../drones/interfaces/drone.repository.interface';
import { CreateDroneDto } from '../../dto/create-drone.dto';
import { dronesList } from './drone-list';

export const mockDroneRepository: DroneRepositoryInterface = {
  save: jest.fn((createDroneDto: CreateDroneDto) => {
    const createdDrone = {
      ...createDroneDto,
      id: 1,
    };
    return Promise.resolve(createdDrone);
  }),
  getById: jest.fn(() => Promise.resolve(dronesList[0])),
  delete: jest.fn(() => Promise.resolve(true)),
  paginate: jest.fn(() =>
    Promise.resolve({
      itemsPerPage: 20,
      currentPage: 1,
      totalPages: 1,
      totalItems: dronesList.length,
      data: dronesList,
    }),
  ),
};
