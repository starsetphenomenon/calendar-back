/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceTypeEnums } from 'shared';
import * as moment from 'moment';
import { AbsenceDto } from '../absence/absence.dto';
import { AbsenceEntity } from '../absence/absence.entity';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async getUser() {
        const user = await this.userRepository.find();
        return user;
    }

    async addUser(body: UserDto) {
        const user: UserEntity = new UserEntity();
        user.userName = body.userName;
        user.email = body.email;
        user.password = body.password;
        return await this.userRepository.save(user);
    }

}
