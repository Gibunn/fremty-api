import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users/users.controller';
import { UsersService } from 'src/services/users/users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule { }
