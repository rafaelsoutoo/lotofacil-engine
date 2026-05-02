import { Injectable } from '@nestjs/common'
import { PrismaService } from '../config/prisma/prisma.service'
import { FiltroConcursoDTO } from './dtos/filtro-concurso.dto'
import { ConcursoEntity } from '../concurso/entities/concurso.entity'
import { aplicarFiltroSequencia } from './strategies/filtro-sequencia.strategy'
import { aplicarFiltroParidade } from './strategies/filtro-paridade.strategy'
import { aplicarFiltroFaixa } from './strategies/filtro-faixa.strategy'
import { Prisma } from '@prisma/client'
import { aplicarFiltroSoma } from './strategies/filtro-soma.strategy'

export interface FiltroResult {
  total: number
  concursos: ConcursoEntity[]
}

export interface EstatisticasSoma {
  media: number
  min: number
  max: number
  distribuicao: { faixa: string; quantidade: number; percentual: string }[]
}

@Injectable()
export class FiltroService {
  constructor(private readonly prismaService: PrismaService) {}

  // ── filtrar concursos ─────────────────────────────────────────────────────

  async filtrar(dto: FiltroConcursoDTO): Promise<FiltroResult> {
    const where: Prisma.ConcursoWhereInput = {
      ...aplicarFiltroSoma(dto),
      ...aplicarFiltroSequencia(dto),
      ...aplicarFiltroParidade(dto),
      ...aplicarFiltroFaixa(dto),
    }

    const [total, concursos] = await Promise.all([
      this.prismaService.client.concurso.count({ where }),
      this.prismaService.client.concurso.findMany({
        where,
        orderBy: { numero: 'desc' },
        take: 100,
      }),
    ])

    return { total, concursos }
  }

  // ── estatísticas de soma ──────────────────────────────────────────────────

  async estatisticasSoma(): Promise<EstatisticasSoma> {
    const resultado = await this.prismaService.client.concurso.aggregate({
      _avg: { soma: true },
      _min: { soma: true },
      _max: { soma: true },
    })

    const total = await this.prismaService.client.concurso.count()

    const faixas = [
      { label: '120-145', min: 120, max: 145 },
      { label: '146-170', min: 146, max: 170 },
      { label: '171-195', min: 171, max: 195 },
      { label: '196-220', min: 196, max: 220 },
      { label: '221-245', min: 221, max: 245 },
      { label: '246-270', min: 246, max: 270 },
    ]

    const distribuicao = await Promise.all(
      faixas.map(async ({ label, min, max }) => {
        const quantidade = await this.prismaService.client.concurso.count({
          where: { soma: { gte: min, lte: max } },
        })
        return {
          faixa: label,
          quantidade,
          percentual: ((quantidade / total) * 100).toFixed(2) + '%',
        }
      }),
    )

    return {
      media: Math.round(resultado._avg.soma ?? 0),
      min: resultado._min.soma ?? 0,
      max: resultado._max.soma ?? 0,
      distribuicao,
    }
  }

  // ── estatísticas de sequência ─────────────────────────────────────────────

  async estatisticasSequencia() {
    const total = await this.prismaService.client.concurso.count()

    const sequencias = await this.prismaService.client.concurso.groupBy({
      by: ['maiorSequencia'],
      _count: { maiorSequencia: true },
      orderBy: { maiorSequencia: 'asc' },
    })

    return sequencias.map((s) => ({
      sequencia: s.maiorSequencia,
      quantidade: s._count.maiorSequencia,
      percentual: ((s._count.maiorSequencia / total) * 100).toFixed(2) + '%',
    }))
  }
}