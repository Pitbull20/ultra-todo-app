import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) { }

    @Get('by-email')
    getByEmail(@Query('email') email: string) {
        return this.users.findByEmail(email);
    }
}
