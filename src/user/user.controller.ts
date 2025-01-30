import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Get()
  async getALlUser() {
    const users = await this.userService.getAllUser();
    return users;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    console.log('call by username')
    const user = await this.userService.getUserByUsername(username);
    return user;
  }
}
