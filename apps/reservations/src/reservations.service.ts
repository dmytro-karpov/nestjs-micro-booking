import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservetionsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentsService
      .send('create_charge', { ...createReservationDto.charge, email })
      .pipe(
        map((res) => {
          return this.reservetionsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            placeId: '123',
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }

  async findAll() {
    return this.reservetionsRepository.find({});
  }

  async findOne(id: string) {
    return this.reservetionsRepository.findOne({ _id: id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservetionsRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  async remove(id: string) {
    return this.reservetionsRepository.findOneAndDelete({ _id: id });
  }
}
