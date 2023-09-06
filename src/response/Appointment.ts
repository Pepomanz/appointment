enum AppointmentStatusEnum {
    TO_DO = 1,
    INPROGRESS = 2,
    DONE = 3
}

export interface CommentDetail {
    detail: string
    createdBy: string
    createdAt: number
}

export interface AppointmentDetail {
    title: string
    description: string
    status: AppointmentStatusEnum
    comments: CommentDetail[]
    createdByName: string
    createdByEmail: string
    createdAt: number
}

export interface AppointmentStatusDetail {
    id: AppointmentStatusEnum
    status: string
}