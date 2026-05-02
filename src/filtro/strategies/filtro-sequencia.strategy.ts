import { Prisma } from '@prisma/client'
import { FiltroConcursoDTO } from '../dtos/filtro-concurso.dto'

export function aplicarFiltroSequencia(
  dto: FiltroConcursoDTO,
): Prisma.ConcursoWhereInput {
  const where: Prisma.ConcursoWhereInput = {}

  if (
    dto.maiorSequenciaMin !== undefined ||
    dto.maiorSequenciaMax !== undefined
  ) {
    where.maiorSequencia = {
      ...(dto.maiorSequenciaMin !== undefined && { gte: dto.maiorSequenciaMin }),
      ...(dto.maiorSequenciaMax !== undefined && { lte: dto.maiorSequenciaMax }),
    }
  }

  return where
}