import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiDocsConfig } from './infra/config/api-docs.config';

const PORT = process.env.PORT!;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ApiDocsConfig.setupApiDocs(app);

  await app.listen(PORT);

  Logger.debug(`Application running at PORT ${PORT}`, 'main');
}
bootstrap();
