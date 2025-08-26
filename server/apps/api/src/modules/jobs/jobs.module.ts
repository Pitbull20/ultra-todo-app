// src/jobs/jobs.module.ts
import { Module } from '@nestjs/common';
import { AppConfigService } from './../../config/config.service';
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { AppConfigModule } from '../../config/config.module';

@Module({
    imports: [AppConfigModule],
    providers: [
        {
            provide: 'REDIS',
            inject: [AppConfigService],
            useFactory: (cfg: AppConfigService) => new IORedis({ host: cfg.get('REDIS_HOST'), port: cfg.get('REDIS_PORT'), maxRetriesPerRequest: null }),
        },
        {
            provide: 'EXAMPLE_QUEUE',
            inject: ['REDIS'],
            useFactory: (redis: IORedis) => new Queue('example', { connection: redis }),
        },
        {
            provide: 'EXAMPLE_WORKER',
            inject: ['REDIS'],
            useFactory: (redis: IORedis) =>
                new Worker(
                    'example',
                    async job => {
                        // your job logic
                        return { ok: true, id: job.id };
                    },
                    { connection: redis },
                ),
        },
    ],
    exports: ['EXAMPLE_QUEUE'],
})
export class JobsModule { }
