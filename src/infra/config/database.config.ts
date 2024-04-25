import { Inject } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { KeysFromSnakeToCamelCase } from '../../shared/types/utility-types';

export interface EnvironmentVariablesForDatabaseConfig {
  DATABASE_URI: string;
  DATABASE_SCHEMA: string;
}

export interface DatabaseConfig
  extends KeysFromSnakeToCamelCase<EnvironmentVariablesForDatabaseConfig> {
  type: 'postgres';
}

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const DatabaseConfigValidationSchema = Joi.object<
  EnvironmentVariablesForDatabaseConfig,
  true
>({
  DATABASE_URI: Joi.string().uri().required(),
  DATABASE_SCHEMA: Joi.string().required(),
});

export const databaseConfig = registerAs<DatabaseConfig>(
  DATABASE_CONFIG,
  () => {
    const {
      env: { DATABASE_URI, DATABASE_SCHEMA },
    } = process;

    const config: DatabaseConfig = {
      databaseSchema: DATABASE_SCHEMA!,
      databaseUri: DATABASE_URI!,
      type: 'postgres',
    };

    return config;
  },
);

export const DatabaseConfigInjectionKey = databaseConfig.KEY;
export const InjectDatabaseConfig = Inject(DatabaseConfigInjectionKey);
export const DatabaseConfigFeatureModule =
  ConfigModule.forFeature(databaseConfig);
