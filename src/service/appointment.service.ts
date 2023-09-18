import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AppointmentStatus from '../entity/appointment_status.entity';
import Appointment from '../entity/appointment.entity';
import Comment from 'src/entity/comment.entity';
import {
  AppointmentDetail,
  AppointmentStatusDetail,
  CommentDetail,
} from '../response/Appointment';
import { CommentRequest } from 'src/request/Appointment';
import User from 'src/entity/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(AppointmentStatus)
    private appointmentStatusRepository: Repository<AppointmentStatus>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findNonArchieveList(): Promise<AppointmentDetail[]> {
    const data = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.user', 'user')
      .leftJoinAndSelect('appointment.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'usc')
      .where('appointment.is_archieve = :is_archieve', { is_archieve: false })
      .getMany();
    const result: AppointmentDetail[] = data.map((it) => {
      const comments: CommentDetail[] = it.comments.map((it) => ({
        detail: it.detail,
        createdBy: this.getFullName(it.user),
        createdAt: it.createdAt.getTime(),
      }));
      return {
        title: it.title,
        description: it.description,
        status: it.appointmentStatusId,
        comments,
        createdByName: this.getFullName(it.user),
        createdByEmail: it.user.email,
        createdAt: it.createdAt.getTime(),
      };
    });
    return result;
  }

  async findByAppointmentId(appointmentId: number): Promise<AppointmentDetail> {
    const data = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.user', 'user')
      .leftJoinAndSelect('appointment.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'usc')
      .where('appointment.appointment_id = :appointment_id', {
        appointment_id: appointmentId,
      })
      .getOne();
    if (data == undefined) {
      throw new NotFoundException('Appointment not found');
    }
    const comments: CommentDetail[] = data.comments.map((it) => ({
      detail: it.detail,
      createdBy: this.getFullName(it.user),
      createdAt: it.createdAt.getTime(),
    }));
    const result: AppointmentDetail = {
      title: data.title,
      description: data.description,
      status: data.appointmentStatusId,
      comments,
      createdByName: data.user.firstName + data.user.lastName,
      createdByEmail: data.user.email,
      createdAt: data.createdAt.getTime(),
    };
    return result;
  }

  async findAppoinementStatusList(): Promise<AppointmentStatusDetail[]> {
    const data = await this.appointmentStatusRepository.find();
    const result: AppointmentStatusDetail[] = data.map((it) => {
      return {
        id: it.appointmentStatusId,
        status: it.name,
      };
    });
    return result;
  }

  async insertComment(request: CommentRequest): Promise<void> {
    const user = await this.userRepository.findOneBy({ userId: request.userId });
    if (user == undefined) {
      throw new NotFoundException('User not found');
    }
    const appointment = await this.appointmentRepository.findOneBy({ appointmentId: request.appointmentId });
    if (appointment == undefined) {
      throw new NotFoundException('Appointment not found');
    }
    const comment: Comment = {
      commentId: null,
      userId: request.userId,
      appointmentId: request.appointmentId,
      detail: request.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
      appointment: null,
      user: null,
    };
    this.commentRepository.save(comment);
  }

  private getFullName(user: User) {
    if (user == undefined) {
      return '';
    }
    return `${user.firstName} ${user.lastName}`;
  }
}
