import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
      },
    }),
    AppConfigModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    JobsModule,
  ],
})
export class AppModule { }
