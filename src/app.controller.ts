import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { StatusResponseTest } from './app-defs';

@Controller('api')
@ApiTags('Api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): StatusResponseTest {
    return this.appService.getStatus();
  }
}
