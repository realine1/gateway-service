import { Injectable } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',  // Docker container name for User-Service
      port: 3002,            // Port User-Service is listening on for TCP requests
    },
  })
  private client: ClientTCP;

  async getUserByUsername(username: string) {
    return this.client.send({ cmd: 'get-user' }, username);
  }
}
