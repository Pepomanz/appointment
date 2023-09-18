import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from '../service/appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entity/user.entity';
import Appointment from '../entity/appointment.entity';
import AppointmentStatus from '../entity/appointment_status.entity';
import Comment from '../entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Appointment, AppointmentStatus, Comment]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
