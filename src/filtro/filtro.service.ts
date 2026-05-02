import { Injectable } from '@nestjs/common'
import { FiltroConcursoDTO } from './dtos/filtro-concurso.dto'

export interface CartelaComMetricas {
  dezenas: number[]
  soma: number
  pares: number
  impares: number
  maiorSequencia: number
  faixa1a5: number
  faixa6a10: number
  faixa11a15: number
  faixa16a20: number
  faixa21a25: number
}

export interface FiltroCombinatorioResult {
  tipoAnalise: 'combinatoria-lotofacil'
  totalCombinacoes: number
  totalFiltradas: number
  limiteRetorno: number
  cartelas: CartelaComMetricas[]
}

@Injectable()
export class FiltroService {
  private readonly totalCombinacoes = 3268760
  private readonly limitePadrao = 200
  private readonly limiteMaximo = 5000

  // ── filtrar cartelas combinatórias (15 de 25) ────────────────────────────

  async filtrar(dto: FiltroConcursoDTO): Promise<FiltroCombinatorioResult> {
    const limiteRetorno = Math.min(
      Math.max(dto.limiteRetorno ?? this.limitePadrao, 1),
      this.limiteMaximo,
    )

    const cartelas: CartelaComMetricas[] = []
    let totalFiltradas = 0

    const backtrack = (
      inicio: number,
      selecionadas: number[],
      soma: number,
      pares: number,
      faixa1a5: number,
      faixa6a10: number,
      faixa11a15: number,
      faixa16a20: number,
      faixa21a25: number,
      sequenciaAtual: number,
      maiorSequencia: number,
    ) => {
      if (selecionadas.length === 15) {
        if (!this.passaFiltrosFinais(dto, { soma, pares, maiorSequencia, faixa1a5, faixa6a10, faixa11a15, faixa16a20, faixa21a25 })) {
          return
        }

        totalFiltradas += 1

        if (cartelas.length < limiteRetorno) {
          cartelas.push({
            dezenas: [...selecionadas],
            soma,
            pares,
            impares: 15 - pares,
            maiorSequencia,
            faixa1a5,
            faixa6a10,
            faixa11a15,
            faixa16a20,
            faixa21a25,
          })
        }
        return
      }

      const faltamEscolher = 15 - selecionadas.length
      const maxInicio = 25 - faltamEscolher + 1

      for (let dezena = inicio; dezena <= maxInicio; dezena += 1) {
        const ultima = selecionadas[selecionadas.length - 1]
        const novaSequenciaAtual = ultima !== undefined && dezena === ultima + 1 ? sequenciaAtual + 1 : 1
        const novoMaiorSequencia = Math.max(maiorSequencia, novaSequenciaAtual)

        const novoSoma = soma + dezena
        const novoPares = pares + (dezena % 2 === 0 ? 1 : 0)

        const novaFaixa1a5 = faixa1a5 + (dezena >= 1 && dezena <= 5 ? 1 : 0)
        const novaFaixa6a10 = faixa6a10 + (dezena >= 6 && dezena <= 10 ? 1 : 0)
        const novaFaixa11a15 = faixa11a15 + (dezena >= 11 && dezena <= 15 ? 1 : 0)
        const novaFaixa16a20 = faixa16a20 + (dezena >= 16 && dezena <= 20 ? 1 : 0)
        const novaFaixa21a25 = faixa21a25 + (dezena >= 21 && dezena <= 25 ? 1 : 0)

        if (
          this.excedeMaximosParciais(dto, {
            soma: novoSoma,
            pares: novoPares,
            maiorSequencia: novoMaiorSequencia,
            faixa1a5: novaFaixa1a5,
            faixa6a10: novaFaixa6a10,
            faixa11a15: novaFaixa11a15,
            faixa16a20: novaFaixa16a20,
            faixa21a25: novaFaixa21a25,
          })
        ) {
          continue
        }

        selecionadas.push(dezena)
        backtrack(
          dezena + 1,
          selecionadas,
          novoSoma,
          novoPares,
          novaFaixa1a5,
          novaFaixa6a10,
          novaFaixa11a15,
          novaFaixa16a20,
          novaFaixa21a25,
          novaSequenciaAtual,
          novoMaiorSequencia,
        )
        selecionadas.pop()
      }
    }

    backtrack(1, [], 0, 0, 0, 0, 0, 0, 0, 0, 0)

    return {
      tipoAnalise: 'combinatoria-lotofacil',
      totalCombinacoes: this.totalCombinacoes,
      totalFiltradas,
      limiteRetorno,
      cartelas,
    }
  }

  private excedeMaximosParciais(
    dto: FiltroConcursoDTO,
    metricas: Omit<CartelaComMetricas, 'dezenas' | 'impares'>,
  ): boolean {
    if (dto.somaMax !== undefined && metricas.soma > dto.somaMax) return true
    if (dto.paresMax !== undefined && metricas.pares > dto.paresMax) return true
    if (dto.maiorSequenciaMax !== undefined && metricas.maiorSequencia > dto.maiorSequenciaMax) return true

    if (dto.faixa1a5Max !== undefined && metricas.faixa1a5 > dto.faixa1a5Max) return true
    if (dto.faixa6a10Max !== undefined && metricas.faixa6a10 > dto.faixa6a10Max) return true
    if (dto.faixa11a15Max !== undefined && metricas.faixa11a15 > dto.faixa11a15Max) return true
    if (dto.faixa16a20Max !== undefined && metricas.faixa16a20 > dto.faixa16a20Max) return true
    if (dto.faixa21a25Max !== undefined && metricas.faixa21a25 > dto.faixa21a25Max) return true

    return false
  }

  private passaFiltrosFinais(
    dto: FiltroConcursoDTO,
    metricas: Omit<CartelaComMetricas, 'dezenas' | 'impares'>,
  ): boolean {
    if (dto.somaMin !== undefined && metricas.soma < dto.somaMin) return false
    if (dto.somaMax !== undefined && metricas.soma > dto.somaMax) return false

    if (dto.maiorSequenciaMin !== undefined && metricas.maiorSequencia < dto.maiorSequenciaMin) return false
    if (dto.maiorSequenciaMax !== undefined && metricas.maiorSequencia > dto.maiorSequenciaMax) return false

    if (dto.paresMin !== undefined && metricas.pares < dto.paresMin) return false
    if (dto.paresMax !== undefined && metricas.pares > dto.paresMax) return false

    if (dto.faixa1a5Min !== undefined && metricas.faixa1a5 < dto.faixa1a5Min) return false
    if (dto.faixa1a5Max !== undefined && metricas.faixa1a5 > dto.faixa1a5Max) return false

    if (dto.faixa6a10Min !== undefined && metricas.faixa6a10 < dto.faixa6a10Min) return false
    if (dto.faixa6a10Max !== undefined && metricas.faixa6a10 > dto.faixa6a10Max) return false

    if (dto.faixa11a15Min !== undefined && metricas.faixa11a15 < dto.faixa11a15Min) return false
    if (dto.faixa11a15Max !== undefined && metricas.faixa11a15 > dto.faixa11a15Max) return false

    if (dto.faixa16a20Min !== undefined && metricas.faixa16a20 < dto.faixa16a20Min) return false
    if (dto.faixa16a20Max !== undefined && metricas.faixa16a20 > dto.faixa16a20Max) return false

    if (dto.faixa21a25Min !== undefined && metricas.faixa21a25 < dto.faixa21a25Min) return false
    if (dto.faixa21a25Max !== undefined && metricas.faixa21a25 > dto.faixa21a25Max) return false

    return true
  }
}