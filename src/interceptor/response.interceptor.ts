import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Response } from '../response/BaseResponse';
  
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          code: data?.code || '0000',
          message: data?.message || 'SUCCESS',
          data: data,
        }))
      );
    }
  }