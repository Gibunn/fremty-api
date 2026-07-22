import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUser() {
        return await this.usersService.findUsers()
    }
}
