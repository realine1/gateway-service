import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [],
  controllers: [GatewayController, AppController],
  providers: [GatewayService, AppService],
})
export class AppModule {}
