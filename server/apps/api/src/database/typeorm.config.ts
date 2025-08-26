import { DataSource, DataSourceOptions } from 'typeorm';
import { AppConfigService } from '../config/config.service';
import { User } from '../modules/users/user.entity';

export const makePrimaryOptions = (cfg: AppConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: cfg.get('DB_HOST'),
    port: cfg.get('DB_PORT'),
    username: cfg.get('DB_USER'),
    password: cfg.get('DB_PASS'),
    database: cfg.get('DB_NAME'),
    entities: [User],
    synchronize: false,
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    namingStrategy: undefined,
});

export const makeAnalyticsOptions = (cfg: AppConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: cfg.get('AN_DB_HOST') || cfg.get('DB_HOST'),
    port: cfg.get('AN_DB_PORT') || cfg.get('DB_PORT'),
    username: cfg.get('AN_DB_USER') || cfg.get('DB_USER'),
    password: cfg.get('AN_DB_PASS') || cfg.get('DB_PASS'),
    database: cfg.get('AN_DB_NAME') || cfg.get('DB_NAME'),
    entities: [],
    synchronize: false,
});
