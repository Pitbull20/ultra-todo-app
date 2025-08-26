import { Inject, Injectable } from '@nestjs/common';
import { DB_PRIMARY } from '../../database/tokens';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    private repo: Repository<User>;
    constructor(@Inject(DB_PRIMARY) private readonly ds: DataSource) {
        this.repo = ds.getRepository(User);
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    create(data: Pick<User, 'email' | 'name' | 'passwordHash'>) {
        const u = this.repo.create(data);
        return this.repo.save(u);
    }
}
