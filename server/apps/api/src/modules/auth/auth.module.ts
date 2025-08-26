import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '../../config/config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';
import { UsersModule } from '../users/users.module';
import { AppConfigModule } from 'src/config/config.module';

@Module({
    imports: [
        AppConfigModule,
        UsersModule,
        JwtModule.registerAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (cfg: AppConfigService) => ({
                secret: cfg.get('JWT_ACCESS_SECRET'),
                signOptions: { expiresIn: cfg.get('JWT_ACCESS_EXPIRES') },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
