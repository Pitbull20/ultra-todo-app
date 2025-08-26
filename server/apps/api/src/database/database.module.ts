import { Module, Global } from '@nestjs/common';
import { AppConfigService } from '../config/config.service';
import { DataSource } from 'typeorm';
import { makePrimaryOptions, makeAnalyticsOptions } from './typeorm.config';
import { DB_PRIMARY, DB_ANALYTICS } from './tokens';
import { AppConfigModule } from 'src/config/config.module';

@Global()
@Module({
    imports: [AppConfigModule],
    providers: [
        {
            provide: DB_PRIMARY,
            inject: [AppConfigService],
            useFactory: async (cfg: AppConfigService) => {
                const ds = new DataSource(makePrimaryOptions(cfg));
                return ds.initialize();
            },
        },
        // {
        //     provide: DB_ANALYTICS,
        //     inject: [AppConfigService],
        //     useFactory: async (cfg: AppConfigService) => {
        //         const ds = new DataSource(makeAnalyticsOptions(cfg));
        //         return ds.initialize();
        //     },
        // },
    ],
    exports: [DB_PRIMARY, /*DB_ANALYTICS */],
})
export class DatabaseModule { }
