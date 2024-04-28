import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DatabaseConfig,
  DatabaseConfigInjectionKey,
} from '../config/database.config';
import { SrcConfig, SrcConfigInjectionKey } from '../config/src.config';
import { dataSourceFactory } from './data-source';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfigInjectionKey, SrcConfigInjectionKey],
      useFactory: async (
        databaseConfig: DatabaseConfig,
        srcConfig: SrcConfig,
      ) => {
        return {
          ...dataSourceFactory(databaseConfig, srcConfig),
          migrationsRun: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
