import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infra/infra.module';
import { SecureNotesModule } from './modules/secure-notes/secure-notes.module';

@Module({
  imports: [InfraModule, SecureNotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
