import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  keys: '1659333394247_4460',
  koa: {
    port: 7001,
  },
  jwt: {
    enable: true,
    secret: 'test',
    expiresIn: '1d',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: 'user.db',
        // dropSchema: true,
        synchronize: true,
        logging: false,
        entities: [UserEntity],
      },
    },
  },
} as MidwayConfig;
