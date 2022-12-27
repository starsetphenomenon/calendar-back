import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUser() {
        //return this.absenceService.getAll();
    }

    @Post()
    async addUser(@Body() user: UserDto) {
        return this.userService.addUser(user);
    }

}
