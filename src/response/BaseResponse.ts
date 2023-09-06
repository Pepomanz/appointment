export class BaseResponse<T>{
    constructor(code = '0000', message = 'SUCCESS', data: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    code: string;
    message: string;
    data: T
}