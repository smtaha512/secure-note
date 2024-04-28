import { Inject } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { KeysFromSnakeToCamelCase } from '../../shared/types/utility-types';

type AllowedFileExtensions = 'ts' | 'js';

export interface EnvironmentVariablesForSrcConfig {
  SRC_FILE_EXTENSION: AllowedFileExtensions;
}

export type SrcConfig =
  KeysFromSnakeToCamelCase<EnvironmentVariablesForSrcConfig>;

export const SRC_CONFIG = 'SRC_CONFIG';

export const SrcConfigValidationSchema = Joi.object<
  EnvironmentVariablesForSrcConfig,
  true
>({
  SRC_FILE_EXTENSION: Joi.string().required(),
});

export const srcConfig = registerAs<SrcConfig>(SRC_CONFIG, () => {
  const {
    env: { SRC_FILE_EXTENSION },
  } = process;

  const config: SrcConfig = {
    srcFileExtension: SRC_FILE_EXTENSION as AllowedFileExtensions,
  };

  return config;
});

export const SrcConfigInjectionKey = srcConfig.KEY;
export const InjectSrcConfig = Inject(SrcConfigInjectionKey);
export const SrcConfigFeatureModule = ConfigModule.forFeature(srcConfig);
