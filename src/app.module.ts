/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceModule } from './absence/absence.module';
import { UserModule } from './user/user.module';

import { AbsenceEntity } from './absence/absence.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db.thin.dev',
    port: 5432,
    username: 'bIQhpdhPUbQoiXVeUIAXCXJwbCKVKKxK',
    password: 'DFhsQtxeHASiSDjuPYThLPJrPInbPBMb',
    database: 'c3fd690d-1f53-4b5a-a611-2858d5be6e41',
    entities: [AbsenceEntity, UserEntity],
    migrations: [AbsenceEntity, UserEntity],
    synchronize: true,
  }),
    AbsenceModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
