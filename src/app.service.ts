import { Injectable } from '@nestjs/common';
import { StatusResponseTest } from './app-defs';

@Injectable()
export class AppService {
  getStatus(): StatusResponseTest {
    return {
      'api.version': '0.0.0',
      status: 'ok',
    };
  }
}
