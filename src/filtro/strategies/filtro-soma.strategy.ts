import { Prisma } from '@prisma/client'
import { FiltroConcursoDTO } from '../dtos/filtro-concurso.dto'

export function aplicarFiltroSoma(
  dto: FiltroConcursoDTO,
): Prisma.ConcursoWhereInput {
  const where: Prisma.ConcursoWhereInput = {}

  if (dto.somaMin !== undefined || dto.somaMax !== undefined) {
    where.soma = {
      ...(dto.somaMin !== undefined && { gte: dto.somaMin }),
      ...(dto.somaMax !== undefined && { lte: dto.somaMax }),
    }
  }

  return where
}