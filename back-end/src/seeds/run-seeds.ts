import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { SeedsModule } from './seeds.module'
import { SeedsService } from './seeds.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedsModule, {
    logger: ['error', 'warn', 'log'],
  })

  const seedsService = app.get(SeedsService)
  await seedsService.runAll()

  await app.close()
}

bootstrap().catch((e) => {
  console.error('\n❌ Erro fatal no seed:', e)
  process.exit(1)
})