import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';
import { CreateUserDto } from './users/dto/create-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost', // Docker container name for User-Service
      port: 3002, // Port User-Service is listening on for TCP requests
    },
  })
  private client: ClientTCP;

  async getUserByUsername(username: string) {
    return this.client.send({ cmd: 'get-user' }, username);
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'create-user' }, createUserDto)
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUser() {
    return this.client.send({ cmd: 'get-all-user' }, {});
  }
}
