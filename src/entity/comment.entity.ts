import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Appointment from './appointment.entity';
import User from './user.entity';

@Entity({ name: 'comment'})
export default class Comment {

    @PrimaryGeneratedColumn({ name: 'comment_id'})
    commentId: number;

    @Column({ name: 'user_id'})
    userId: number;
    
    @Column({ name: 'appointment_id'})
    appointmentId: number;
    
    @Column({ name: 'detail'})
    detail: string;
    
    @Column({ name: 'updated_at'})
    updatedAt: Date;
    
    @Column({ name: 'created_at'})
    createdAt: Date;
    
    @ManyToOne(type => User, user => user.userId)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(type => Appointment, appointment => appointment.appointmentId)
    @JoinColumn({ name: "appointment_id" })
    appointment: Appointment;
}