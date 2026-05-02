// src/seeds/seeds.service.ts
import { Injectable, Logger } from '@nestjs/common'
import { ConcursoSeedService } from './concurso/concurso-seed.service'

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name)

  constructor(private readonly concursoSeed: ConcursoSeedService) {}

  async runAll() {
    this.logger.log('🌱 Iniciando seeds...')
    await this.concursoSeed.run()
    this.logger.log('✅ Todos os seeds concluídos.')
  }
}