import { Injectable } from '@nestjs/common';
import { ConfigService as NestCfg } from '@nestjs/config';
import { Env } from './env.schema';

@Injectable()
export class AppConfigService {
    constructor(private readonly cfg: NestCfg<Env, true>) { }

    get<T extends keyof Env>(key: T): Env[T] {
        return this.cfg.getOrThrow<Env[T]>(key);
    }
}
