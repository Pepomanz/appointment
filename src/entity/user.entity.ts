import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import Appointment from "./appointment.entity";
import Comment from "./comment.entity";

@Entity({ name: 'user'})
export default class  User {
    @PrimaryGeneratedColumn({ name: 'user_id'})
    userId: number;
    
    @Column({ name: 'first_name'})
    firstName: string;

    @Column({ name: 'last_name'})
    lastName: string;

    @Column({ name: 'image'})
    image: string;

    @Column({ name: 'email'})
    email: string;

    @Column({ name: 'updated_at'})
    updatedAt: Date;

    @Column({ name: 'created_at'})
    createdAt: Date;

    @OneToMany(type => Appointment, appointment => appointment.user)
    @JoinColumn({ name: "userId"})
    appointments: Appointment[];

    @OneToMany(type => Comment, comment => comment.user)
    @JoinColumn({ name: "user_id" })
    comments: Comment[];

} 