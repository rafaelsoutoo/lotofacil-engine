export type DistribuicaoSoma = {
  faixa: string
  quantidade: number
  percentual: string
}

export type EstatisticasSomaResponse = {
  media: number
  min: number
  max: number
  distribuicao: DistribuicaoSoma[]
}

export type EstatisticasSequenciaItem = {
  sequencia: number
  quantidade: number
  percentual: string
}
