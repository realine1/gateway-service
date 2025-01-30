import { Controller, Get, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('users')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
    async getUsers() {
        return { message: 'Hello from Gateway' };
    }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.gatewayService.getUserByUsername(username);
    return user;
  }
}
