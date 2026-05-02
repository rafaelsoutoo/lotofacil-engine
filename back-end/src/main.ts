import { NestFactory } from '@nestjs/core'
import { INestApplication, RequestMethod, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { env } from './config/env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'swagger', method: RequestMethod.ALL },
      { path: 'swagger-json', method: RequestMethod.ALL },
      { path: 'swagger-yaml', method: RequestMethod.ALL },
    ],
  })

  configureSwagger(app)
  configureValidationPipe(app)

  await app.listen(env.PORT)

  const base = `http://localhost:${env.PORT}`
  console.log(`🚀 API REST → ${base}/api`)
  console.log(`📘 Swagger UI → ${base}/swagger`)
}

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Quickness API')
    .setDescription('Swagger Quickness API with NestJS')
    .setVersion('1.1.2')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}


function configureValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
bootstrap()