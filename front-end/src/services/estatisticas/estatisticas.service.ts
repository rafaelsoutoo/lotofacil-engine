import { API_PATHS } from '@/src/api/paths'
import type {
  EstatisticasSequenciaItem,
  EstatisticasSomaResponse,
} from '@/src/types/estatisticas'
import { httpClient } from '@/src/services/http/client'

export async function getEstatisticasSoma(): Promise<EstatisticasSomaResponse> {
  const { data } = await httpClient.get<EstatisticasSomaResponse>(
    API_PATHS.ESTATISTICAS_SOMA,
  )
  return data
}

export async function getEstatisticasSequencia(): Promise<
  EstatisticasSequenciaItem[]
> {
  const { data } = await httpClient.get<EstatisticasSequenciaItem[]>(
    API_PATHS.ESTATISTICAS_SEQUENCIA,
  )
  return data
}
