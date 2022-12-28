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
    host: 'containers-us-west-90.railway.app',
    port: 6685,
    username: 'postgres',
    password: 'D2LoBbSMM0Z0i0VaqzGX',
    database: 'railway',
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
