import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/users.dto';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUser() {
        return await this.usersService.findUsers()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.usersService.findUserById({ id })
    }

    @Post()
    async createUser(@Body() data: CreateUserDTO) {
        return await this.usersService.createUser(data)
    }
}
