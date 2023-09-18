import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from './user.entity';
import AppointmentStatus from './appointment_status.entity';
import Comment from './comment.entity';

@Entity({ name: 'appointment' })
export default class Appointment {
  @PrimaryColumn({ name: 'appointment_id' })
  appointmentId: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'is_archieve' })
  isArchieve: boolean;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'appointment_status_id' })
  appointmentStatusId: number;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.appointment)
  @JoinColumn({ name: 'appointment' })
  comments?: Comment[];

  @ManyToOne(() => AppointmentStatus, (status) => status.appointments)
  @JoinColumn({ name: 'appointment_status_id' })
  appointmentStatus: AppointmentStatus;
}
