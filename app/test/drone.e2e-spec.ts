import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DronesModule } from '../src/drones/drones.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DronesService } from '../src/drones/drones.service';
import { Drone } from '../src/drones/drone.entity';
import { ValidationPipe } from '@nestjs/common';
import * as faker from 'faker';
import { Connection, getConnection } from 'typeorm';
import { DroneRepositoryInterface } from '../src/drones/interfaces/drone.repository.interface';

describe('DronesController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  let dronesService: DronesService;
  let droneRepository: DroneRepositoryInterface;

  const drone = {
    image: 'https://rasdhash.org/veroasdquia.jpg',
    name: 'Ze',
    address: '955 Springview Junction',
    battery: 11.7,
    maxSpeed: 92,
    averageSpeed: 7.4,
    status: 'success',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DronesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Drone],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    connection = getConnection();
    droneRepository = moduleFixture.get('DroneRepositoryInterface');
    dronesService = new DronesService(droneRepository);
  });

  afterEach(async () => {
    await connection.query('DELETE FROM drones');
    await app.close();
  });

  describe('insert drones (POST)', () => {
    it('should returns status code 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/drones')
        .send(drone);
      expect(response.status).toEqual(201);
    });

    it('should return the created drone', async () => {
      const response = await request(app.getHttpServer())
        .post('/drones')
        .send(drone);
      expect(response.body).toEqual({
        id: 1,
        ...drone,
      });
    });

    it.each`
      field             | value        | reason
      ${'image'}        | ${null}      | ${'it cannot be null'}
      ${'name'}         | ${null}      | ${'it cannot be null'}
      ${'address'}      | ${null}      | ${'it cannot be null'}
      ${'battery'}      | ${null}      | ${'it cannot be null'}
      ${'battery'}      | ${-1}        | ${'it cannot be negative'}
      ${'battery'}      | ${101}       | ${'it cannot be greater than 100'}
      ${'maxSpeed'}     | ${null}      | ${'it cannot be null'}
      ${'maxSpeed'}     | ${-1}        | ${'it cannot be negative'}
      ${'maxSpeed'}     | ${100}       | ${'it cannot be greater than 99'}
      ${'averageSpeed'} | ${null}      | ${'it cannot be null'}
      ${'averageSpeed'} | ${-1}        | ${'it cannot be negative'}
      ${'averageSpeed'} | ${100}       | ${'it cannot be greater than 99'}
      ${'status'}       | ${null}      | ${'it cannot be null'}
      ${'status'}       | ${'invalid'} | ${'it must be either success or failed'}
    `(
      'should returns status 400 when $field is $value because $reason',
      async ({ field, value }) => {
        const invalidDrone = { ...drone };
        invalidDrone[field] = value;

        const response = await request(app.getHttpServer())
          .post('/drones')
          .send(invalidDrone);
        expect(response.status).toBe(400);
      },
    );

    it.each`
      field       | value
      ${'status'} | ${'success'}
      ${'status'} | ${'failed'}
    `(
      'should accept and create the user when $field is $value',
      async ({ field, value }) => {
        const actualDrone = { ...drone };
        actualDrone[field] = value;

        const response = await request(app.getHttpServer())
          .post('/drones')
          .send(actualDrone);
        expect(response.status).toBe(201);
      },
    );
  });

  describe('list drones (GET)', () => {
    it('should return status code 200', async () => {
      const response = await request(app.getHttpServer()).get('/drones');
      expect(response.status).toBe(200);
    });

    it('should return a pagination response', async () => {
      const response = await request(app.getHttpServer()).get('/drones');
      expect(response.body).toEqual({
        currentPage: 1,
        data: [],
        itemsPerPage: 20,
        totalItems: 0,
        totalPages: 0,
      });
    });
  });

  describe('paginate drones (GET)', () => {
    const droneFactory = async (amount) => {
      for (let i = 0; i < amount; i++) {
        const drone = {
          image: faker.image.imageUrl(),
          name: faker.name.findName(),
          address: faker.address.streetAddress(),
          battery: faker.datatype.number({ min: 0, max: 100 }),
          maxSpeed: faker.datatype.number({
            min: 0,
            max: 99,
            precision: 2,
          }),
          averageSpeed: faker.datatype.number({
            min: 0,
            max: 99,
            precision: 2,
          }),
          status: 'success',
        };
        await dronesService.insert(drone);
      }
    };

    it('should return the correct totalPages', async () => {
      await droneFactory(20);

      const response = await request(app.getHttpServer()).get('/drones').query({
        _page: 10,
        _limit: 2,
      });
      expect(response.body.totalPages).toEqual(10);
    });

    it('should return the correct totalItems', async () => {
      await droneFactory(20);

      const response = await request(app.getHttpServer()).get('/drones').query({
        _page: 10,
        _limit: 2,
      });
      expect(response.body.totalItems).toEqual(20);
    });

    it('should return the correct currentPage', async () => {
      await droneFactory(20);

      const response = await request(app.getHttpServer()).get('/drones').query({
        _page: 10,
        _limit: 2,
      });

      expect(response.body.currentPage).toEqual(10);
    });
  });
});
