import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppointmentService } from '../service/appointment.service';
import { CommentRequest } from "../request/Appointment";
import { AppointmentDetail, AppointmentStatusDetail, CommentDetail } from "../response/Appointment";
import { BaseResponse } from 'src/response/BaseResponse';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService){}
    
    @Get()
    async findNonArchieveList(): Promise<AppointmentDetail[]> {
        return this.appointmentService.findNonArchieveList();
    }
    
    @Post('comments')
    async insertComment(@Body() request: CommentRequest): Promise<void> {
        return this.appointmentService.insertComment(request);
    }

    @Get('status')
    async findAppoinementStatusList(): Promise<AppointmentStatusDetail[]> {
        return this.appointmentService.findAppoinementStatusList();
    }

    @Get(':id/comments')
    async findAppointmentComment(@Param('id') appointmentId: number): Promise<CommentDetail[]> {
        return this.appointmentService.findCommentByAppointmentId(appointmentId);
    }

    @Get(':id/')
    async findAppointment(@Param('id') appointmentId: number): Promise<BaseResponse<AppointmentDetail>> {
        return new BaseResponse(null, null, await this.appointmentService.findByAppointmentId(appointmentId));
    }

}
