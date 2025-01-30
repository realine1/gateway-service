import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  })
  private client: ClientTCP;

  async getUserByUsername(username: string) {
    try {
        const result = await lastValueFrom(this.client.send({ cmd: 'get-user' }, username))
        return result
    } catch (error) {
        throw new BadRequestException(error.message);
    }
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
