import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.auth.validate(dto.email, dto.password);
        return this.auth.issueTokens(user.id);
    }
}
