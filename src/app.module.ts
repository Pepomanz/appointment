import { Module } from '@nestjs/common';

import { AppointmentModule } from './appointment/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AppointmentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'interview',
      // type: process.env.DB_TYPE as any,
      // host: process.env.HOST,
      // port: parseInt(process.env.PORT),
      // username: process.env.USER,
      // password: process.env.PASSWORD,
      // database: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
