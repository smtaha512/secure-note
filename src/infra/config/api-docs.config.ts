import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { EnvConfig, EnvConfigInjectionKey } from './env.config';

export class ApiDocsConfig {
  static setupApiDocs(app: INestApplication): INestApplication {
    const envConfig = app.get<EnvConfig>(EnvConfigInjectionKey);

    const options = ApiDocsConfig.buildDocument(envConfig.appName);
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api-docs', app, document);

    return app;
  }

  private static buildDocument(appName: string): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder()
      .setTitle(`${appName} API Docs`)
      .setDescription(`REST API Documentation for ${appName}`)
      .setVersion('1.0')
      .addBearerAuth({
        name: 'Authorization',
        description: 'Please enter token without Bearer keyword',
        type: 'http',
      })
      .build();
  }
}
