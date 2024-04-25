import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  DatabaseConfig,
  DatabaseConfigInjectionKey,
} from '../config/database.config';
import { SrcConfig, SrcConfigInjectionKey } from '../config/src.config';
import { dataSourceFactory } from './data-source';

export const databaseProvider: Provider<DataSource> = {
  provide: 'DATA_SOURCE',
  useFactory: async (databaseConfig: DatabaseConfig, srcConfig: SrcConfig) => {
    const dataSource = await new DataSource(
      dataSourceFactory(databaseConfig, srcConfig),
    ).initialize();

    await dataSource
      .createQueryRunner()
      .createSchema(databaseConfig.databaseSchema, /* ifNotExist = */ true);

    return dataSource;
  },
  inject: [DatabaseConfigInjectionKey, SrcConfigInjectionKey],
};
