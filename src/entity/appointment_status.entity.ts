import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Appointment from './appointment.entity';

@Entity({ name: 'appointment_status' })
export default class AppointmentStatus {
  @PrimaryGeneratedColumn({ name: 'appointment_status_id' })
  appointmentStatusId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Appointment, (status) => status.appointmentStatus)
  @JoinColumn({ name: 'appointment_status_id' })
  appointments: Appointment[];
}
