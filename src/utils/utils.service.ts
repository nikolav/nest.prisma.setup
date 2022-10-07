import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

const reSlashes = /^(.*?)(\/*)$/;
//
@Injectable()
export class UtilsService {
  constructor(
    private readonly config: ConfigService, // private readonly prisma: PrismaService
  ) {}

  isEnvTest(): boolean {
    return 'testing' === this.config.get('NODE_ENV');
  }
  //
  stripEndSlashes(s: string) {
    return s.replace(reSlashes, (_, $1) => $1);
  }
}
