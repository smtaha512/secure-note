import { Module } from '@nestjs/common';
import { DatabaseConfigFeatureModule } from '../config/database.config';
import { SrcConfigFeatureModule } from '../config/src.config';
import { databaseProvider } from './database.provider';

@Module({
  imports: [DatabaseConfigFeatureModule, SrcConfigFeatureModule],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
