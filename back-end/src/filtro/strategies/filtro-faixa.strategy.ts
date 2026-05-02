import { Prisma } from '@prisma/client'
import { FiltroConcursoDTO } from '../dtos/filtro-concurso.dto'

type FaixaKey = 'faixa1a5' | 'faixa6a10' | 'faixa11a15' | 'faixa16a20' | 'faixa21a25'

const faixas: FaixaKey[] = [
  'faixa1a5',
  'faixa6a10',
  'faixa11a15',
  'faixa16a20',
  'faixa21a25',
]

export function aplicarFiltroFaixa(
  dto: FiltroConcursoDTO,
): Prisma.ConcursoWhereInput {
  const where: Prisma.ConcursoWhereInput = {}

  for (const faixa of faixas) {
    const minKey = `${faixa}Min` as keyof FiltroConcursoDTO
    const maxKey = `${faixa}Max` as keyof FiltroConcursoDTO

    const min = dto[minKey] as number | undefined
    const max = dto[maxKey] as number | undefined

    if (min !== undefined || max !== undefined) {
      where[faixa] = {
        ...(min !== undefined && { gte: min }),
        ...(max !== undefined && { lte: max }),
      }
    }
  }

  return where
}