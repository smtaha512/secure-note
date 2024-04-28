import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import {
  DatabaseConfig,
  DatabaseConfigInjectionKey,
} from '../config/database.config';
import { SrcConfig, SrcConfigInjectionKey } from '../config/src.config';

export function dataSourceFactory(
  databaseConfig: DatabaseConfig,
  srcConfig: SrcConfig,
): DataSourceOptions & { cli: { migrationsDir: string } } {
  const { srcFileExtension } = srcConfig;

  return {
    entities: [`${__dirname}/**/*.typeorm.entity.${srcFileExtension}`],
    migrations: [`${__dirname}/migrations/**.migration.${srcFileExtension}`],
    schema: databaseConfig.databaseSchema,
    type: databaseConfig.type,
    url: databaseConfig.databaseUri,
    dropSchema: false,
    synchronize: false,
    cli: {
      migrationsDir: `${__dirname}/migrations`,
    },
  };
}

async function buildDataSourceForMigrations(): Promise<DataSource> {
  const app = await NestFactory.create<NestExpressApplication>(ConfigModule);

  const databaseConfig = app.get(DatabaseConfigInjectionKey);
  const srcConfig = app.get(SrcConfigInjectionKey);

  const dataSourceOptions = dataSourceFactory(databaseConfig, srcConfig);

  const dataSource = new DataSource(dataSourceOptions);

  await dataSource.initialize();

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.createSchema(
    databaseConfig.databaseSchema,
    /* ifNotExist = */ true,
  );
  await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  // Since TypeORM will initialize the dataSource internally we need to destroy it here otherwise it will throw error
  await dataSource.destroy();

  // Returning the dataSource from above will throw error
  return new DataSource(dataSourceOptions);
}

export default buildDataSourceForMigrations();
