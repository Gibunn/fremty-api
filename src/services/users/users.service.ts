import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from 'src/dto/users.dto';
import { hashPassword } from 'src/utils/hash.utils';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findUsers() {
        return await this.prisma.user.findMany()
    }

    async findUserById(where: Prisma.UserWhereUniqueInput) {
        return await this.prisma.user.findFirst({ where })
    }

    async createUser(data: CreateUserDTO) {
        const hashedPassword = await hashPassword(data.password)

        const formatData = {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            avatar_url: '',
            provider_id: '',
            auth_provider: ''
        }

        return await this.prisma.user.create({
            data: formatData
        })
    }
}
