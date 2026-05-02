export type FiltroPayload = {
  somaMin?: number
  somaMax?: number
  maiorSequenciaMin?: number
  maiorSequenciaMax?: number
  paresMin?: number
  paresMax?: number
  faixa1a5Min?: number
  faixa1a5Max?: number
  faixa6a10Min?: number
  faixa6a10Max?: number
  faixa11a15Min?: number
  faixa11a15Max?: number
  faixa16a20Min?: number
  faixa16a20Max?: number
  faixa21a25Min?: number
  faixa21a25Max?: number
  page?: number
  pageLimite?: number
}

export type CartelaComMetricas = {
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

export type FiltroResponse = {
  tipoAnalise: 'combinatoria-lotofacil'
  totalCombinacoes: number
  totalFiltradas: number
  paginacao: {
    page: number
    pageLimite: number
    totalPaginas: number
    temProxima: boolean
    temAnterior: boolean
  }
  cartelas: CartelaComMetricas[]
}
