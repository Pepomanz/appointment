import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AppointmentStatus from '../entity/appointment_status.entity';
import Appointment from '../entity/appointment.entity';
import Comment from 'src/entity/comment.entity';
import { AppointmentDetail, AppointmentStatusDetail, CommentDetail } from "../response/Appointment";
import { CommentRequest } from 'src/request/Appointment';
import { Logger } from './logger/logger.service';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(AppointmentStatus)
        private appointmentStatusRepository: Repository<AppointmentStatus>,
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
    ) {}
    private readonly logger: Logger = new Logger();

    async findNonArchieveList(): Promise<AppointmentDetail[]> {
      const data = await this.appointmentRepository
      .createQueryBuilder("appointment")
      .leftJoinAndSelect("appointment.user", "user")
      .where("appointment.is_archieve = :is_archieve", { is_archieve: false })
      .getMany()
      const result: AppointmentDetail[] = data.map(it => {
        return {
          title: it.title,
          description: it.description,
          status: it.appointmentStatusId,
          comments: [],
          createdByName: it.user.firstName + it.user.lastName,
          createdByEmail: it.user.email,
          createdAt: it.createdAt.getTime()
        }
      });
      this.logger.log('findNonArchieveList done');
      return result;
    }

    async findByAppointmentId(appointmentId: number): Promise<AppointmentDetail> {
      const data = await this.appointmentRepository
      .createQueryBuilder("appointment")
      .leftJoinAndSelect("appointment.user", "user")
      .where("appointment.appointment_id = :appointment_id", { appointment_id: appointmentId })
      .getOne();
      if (data === undefined) {
        throw new NotFoundException();
      }
      const result: AppointmentDetail = {
        title: data.title,
        description: data.description,
        status: data.appointmentStatusId,
        comments: [],
        createdByName: data.user.firstName + data.user.lastName,
        createdByEmail: data.user.email,
        createdAt: data.createdAt.getTime()
      };
      return result;
    }

    async findAppoinementStatusList(): Promise<AppointmentStatusDetail[]> {
      const data = await this.appointmentStatusRepository.find()
      const result: AppointmentStatusDetail[] = data.map(
        it => {
          return {
            id: it.appointmentStatusId,
            status: it.name
          }
        }
      );
      return result;
    }

    async findCommentByAppointmentId(appointmentId: number): Promise<CommentDetail[]> {
      const result = await this.commentRepository
        .createQueryBuilder("comment")
        .leftJoinAndSelect("comment.user", "user")
        .where("comment.appointment_id = :appointment_id", { appointment_id: appointmentId })
        .getMany()
      return result.map(
        it => {
          return {
            detail: it.detail,
            createdBy: it.user.firstName + it.user.lastName,
            createdAt: it.createdAt.getTime()
          };
        }
      );
    }

    async insertComment(request: CommentRequest): Promise<void>{
      const comment: Comment = {
        commentId: null,
        userId: request.userId,
        appointmentId: request.appointmentId,
        detail: request.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
        appointment: null,
        user: null
      };
      this.commentRepository.save(comment);
    }

}
