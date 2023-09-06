import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentRequest {
    @IsNumber({}, {message: 'userId is required'})
    userId: number;
    @IsNumber({}, {message: 'appointmentId is required'})
    appointmentId: number;
    @IsNotEmpty({message: 'comment is required'})
    comment: string;
}
