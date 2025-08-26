import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema';
import { AppConfigService } from './config.service';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validate: (raw: Record<string, unknown>) => {
                const parsed = envSchema.safeParse(raw);
                if (!parsed.success) {
                    console.error(parsed.error.format());
                    throw new Error('Invalid environment variables');
                }
                return parsed.data;
            },
        }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule { }
