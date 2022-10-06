import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    private readonly config: ConfigService,
    private readonly utils: UtilsService,
  ) {
    super({
      log: ['info'],
      datasources: {
        db: {
          url: config.get(
            utils.isEnvTest() ? 'DATABASE_URL__TEST' : 'DATABASE_URL',
          ),
        },
      },
    });
  }
}
