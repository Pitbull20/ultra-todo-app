import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from '../../config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UsersService,
        private readonly jwt: JwtService,
        private readonly cfg: AppConfigService,
    ) { }

    async validate(email: string, password: string) {
        const u = await this.users.findByEmail(email);
        if (!u) throw new UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, u.passwordHash);
        if (!ok) throw new UnauthorizedException('Invalid credentials');
        return u;
    }

    issueTokens(userId: string) {
        const access = this.jwt.sign({ sub: userId });
        const refresh = this.jwt.sign(
            { sub: userId, typ: 'refresh' },
            {
                secret: this.cfg.get('JWT_REFRESH_SECRET'),
                expiresIn: this.cfg.get('JWT_REFRESH_EXPIRES'),
            },
        );
        return { access, refresh };
    }
}
