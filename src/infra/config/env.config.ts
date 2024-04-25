import { Inject } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { KeysFromSnakeToCamelCase } from '../../shared/types/utility-types';

type APP_TIMEZONE = 'UTC';
const validTimezones: APP_TIMEZONE[] = ['UTC'];

export interface EnvironmentVariables {
  ALLOWED_CORS_ORIGINS: string;
  APP_NAME: string;
  CORS_MAX_AGE_IN_SECONDS: number;
  NODE_ENV: Environments;
  PORT: number;
  TZ: APP_TIMEZONE;
}

export type EnvConfig = KeysFromSnakeToCamelCase<EnvironmentVariables>;
export type EnvFilePath = `.env.${Environments}`;

export enum Environments {
  LOCAL = 'local',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

export const environments = Object.values(Environments);
export const envFilePaths: EnvFilePath[] = [
  Environments.PRODUCTION,
  Environments.STAGING,
  Environments.DEVELOPMENT,
  Environments.TESTING,
  Environments.LOCAL,
].map((env) => `.env.${env}` as EnvFilePath);

export const EnvConfigValidationSchema = Joi.object<EnvironmentVariables, true>(
  {
    ALLOWED_CORS_ORIGINS: Joi.string().uri(),
    APP_NAME: Joi.string().required(),
    CORS_MAX_AGE_IN_SECONDS: Joi.number(),
    NODE_ENV: Joi.string()
      .valid(...environments)
      .required(),
    PORT: Joi.number().required(),
    TZ: Joi.string()
      .valid(...validTimezones)
      .required(),
  },
);

export const ENV_CONFIG = 'ENV_CONFIG';
export const envConfig = registerAs<EnvConfig>(ENV_CONFIG, () => {
  const {
    env: {
      ALLOWED_CORS_ORIGINS,
      APP_NAME,
      CORS_MAX_AGE_IN_SECONDS,
      NODE_ENV,
      PORT,
      TZ,
    },
  } = process;

  const config: EnvConfig = {
    allowedCorsOrigins: ALLOWED_CORS_ORIGINS!,
    appName: APP_NAME!,
    corsMaxAgeInSeconds: +CORS_MAX_AGE_IN_SECONDS!,
    nodeEnv: NODE_ENV as Environments,
    port: +PORT!,
    tz: TZ as APP_TIMEZONE,
  };

  return config;
});

export const EnvConfigInjectionKey = envConfig.KEY;
export const InjectEnvConfig = Inject(EnvConfigInjectionKey);
export const EnvConfigFeatureModule = ConfigModule.forFeature(envConfig);
