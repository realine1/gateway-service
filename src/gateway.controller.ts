import { Body, ConflictException, Controller, Get, Param, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('users')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.gatewayService.createUser(createUserDto);
    return user;
  }

  @Get()
  async getALlUser() {
    const users = await this.gatewayService.getAllUser();
    return users;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.gatewayService.getUserByUsername(username);
    return user;
  }
}
