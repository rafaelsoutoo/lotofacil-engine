import { Prisma } from '@prisma/client'
import { FiltroConcursoDTO } from '../dtos/filtro-concurso.dto'

export function aplicarFiltroParidade(
  dto: FiltroConcursoDTO,
): Prisma.ConcursoWhereInput {
  const where: Prisma.ConcursoWhereInput = {}

  if (dto.paresMin !== undefined || dto.paresMax !== undefined) {
    where.pares = {
      ...(dto.paresMin !== undefined && { gte: dto.paresMin }),
      ...(dto.paresMax !== undefined && { lte: dto.paresMax }),
    }
  }

  return where
}