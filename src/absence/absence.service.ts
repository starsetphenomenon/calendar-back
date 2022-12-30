/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from './absence.entity';
import { AbsenceDto } from './absence.dto';
import * as moment from 'moment';
import { UserDto } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';

export enum AbsenceTypeEnums {
    ALL = 'all',
    SICK = 'sick',
    VACATION = 'vacation',
  }

@Injectable()
export class AbsenceService {
    constructor(
        @InjectRepository(AbsenceEntity)
        private readonly absenceRepository: Repository<AbsenceEntity>,
        private jwtService: JwtService
    ) { }

    private readonly sickEntitlement = 10;
    private readonly vacationEntitlement = 20;

    async getAll(userToken: string) {
        const { id } = await this.jwtService.verify(userToken);
        const absences = await this.absenceRepository.find({
            where: {
                user: { id }
            },
        });
        return absences;
    }

    async getAvailableDays(userToken: string) {
        const { id } = await this.jwtService.verify(userToken);
        const absences = await this.absenceRepository.find({
            where: {
                user: { id }
            },
        });
        return this.countAvailableDays(absences);
    }

    async addAbsence(body: { userToken: string, absence: AbsenceDto }) {
        const { id } = await this.jwtService.verify(body.userToken);
        const absence = await this.absenceRepository.create({
            ...body.absence,
            user: id,
        });
        return await this.absenceRepository.save(absence);
    }

    async deleteAbsence(id: number) {
        return await this.absenceRepository.delete({ id: id });
    }

    async updateAbsence(id: number, absence: AbsenceDto) {
        return await this.absenceRepository.update({
            id,
        }, {
            ...absence,
        });
    }

    countAvailableDays(data: AbsenceEntity[]) {
        let sickTakenDays = 0;
        let vacationTakenDays = 0;
        data.forEach((absence) => {
            if (absence.absenceType === AbsenceTypeEnums.SICK) {
                sickTakenDays +=
                    moment
                        .duration(moment(absence.toDate).diff(absence.fromDate))
                        .asDays() + 1;
            }
            if (absence.absenceType === AbsenceTypeEnums.VACATION) {
                vacationTakenDays +=
                    moment
                        .duration(moment(absence.toDate).diff(absence.fromDate))
                        .asDays() + 1;
            }
        });

        return {
            sick: {
                entitlement: this.sickEntitlement,
                taken: sickTakenDays,
            },
            vacation: {
                entitlement: this.vacationEntitlement,
                taken: vacationTakenDays,
            },
        }
    }

}