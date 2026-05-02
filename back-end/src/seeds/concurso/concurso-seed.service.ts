import { Injectable, Logger } from '@nestjs/common'
import { ConcursoService } from '../../concurso/concurso.service' // ← corrigido
import { CreateConcursoDTO } from '../../concurso/dtos/create-concurso.dto'
import { loadJson } from './concurso.seed' // ← corrigido também (estava '../concurso/concurso.seed')

@Injectable()
export class ConcursoSeedService {
  private readonly logger = new Logger(ConcursoSeedService.name)
  private readonly BATCH_SIZE = 500

  constructor(private readonly concursoService: ConcursoService) {}

  async run(): Promise<void> {
    const concursos: CreateConcursoDTO[] = loadJson()

    this.logger.log(`📂 Total no arquivo: ${concursos.length}`)
    this.logger.log(
      `   Período: nº${concursos[0].numero} (${concursos[0].data}) → nº${concursos.at(-1)!.numero} (${concursos.at(-1)!.data})`,
    )

    let inseridosTotal = 0
    let ignoradosTotal = 0
    let errosTotal = 0

    console.log(`\n⏳ Importando em batches de ${this.BATCH_SIZE}...\n`)

    for (let i = 0; i < concursos.length; i += this.BATCH_SIZE) {
      const batch = concursos.slice(i, i + this.BATCH_SIZE)
      const result = await this.concursoService.importarLote(batch)

      inseridosTotal += result.inseridos
      ignoradosTotal += result.ignorados
      errosTotal     += result.erros

      process.stdout.write(
        `\r   ${barra(Math.min(i + this.BATCH_SIZE, concursos.length), concursos.length)}`,
      )
    }

    const totalNoBanco = await this.concursoService.contarTotal()

    console.log('\n')
    console.log('──────────────────────────────────────────────')
    console.log('🎯 Seed concursos concluído!')
    console.log(`   Inseridos         : ${inseridosTotal}`)
    console.log(`   Já existiam       : ${ignoradosTotal}`)
    if (errosTotal > 0) console.log(`   Erros             : ${errosTotal}`)
    console.log(`   Total no banco    : ${totalNoBanco}`)
    console.log('──────────────────────────────────────────────\n')
  }
}

function barra(atual: number, total: number): string {
  const pct = Math.round((atual / total) * 100)
  const filled = Math.floor(pct / 5)
  return `[${'█'.repeat(filled)}${'░'.repeat(20 - filled)}] ${pct}% (${atual}/${total})`
}