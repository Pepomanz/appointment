import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}