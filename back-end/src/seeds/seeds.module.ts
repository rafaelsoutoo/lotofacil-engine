// src/seeds/seeds.module.ts
import { Module } from '@nestjs/common'
import { PrismaModule } from '../config/prisma/prisma.module'
import { ConcursoModule } from '../concurso/concurso.module'
import { ConcursoSeedService } from './concurso/concurso-seed.service'
import { SeedsService } from './seeds.service'

@Module({
  imports: [PrismaModule, ConcursoModule],
  providers: [SeedsService, ConcursoSeedService],
})
export class SeedsModule {}