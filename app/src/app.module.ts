import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './db/typeorm/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        //Estou juntando a configuração padrão do typeorm
        //com campos específicos do nest.
        return Object.assign(ormconfig(), {
          autoLoadEntities: true,
        });
      },
    }),
    DronesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
