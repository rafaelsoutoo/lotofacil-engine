import * as fs from 'fs'
import * as path from 'path'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { CreateConcursoDTO } from '../../concurso/dtos/create-concurso.dto'

const JSON_PATH = path.join(__dirname, '../../..', 'src/seeds/data/concursos.json')

export function loadJson(): CreateConcursoDTO[] {
  if (!fs.existsSync(JSON_PATH)) {
    throw new Error(`concursos.json não encontrado em: ${JSON_PATH}`)
  }

  const raw: unknown[] = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'))

  const concursos = raw.map((item, index) => {
    const dto = plainToInstance(CreateConcursoDTO, item, {
      enableImplicitConversion: true,
    })

    const errors = validateSync(dto, { skipMissingProperties: false })

    if (errors.length > 0) {
      const detalhes = errors
        .map((e) => `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`)
        .join(' | ')
      throw new Error(`Concurso index ${index} (nº${dto.numero}) inválido → ${detalhes}`)
    }

    return dto
  })

  return concursos
}