import { API_PATHS } from '@/src/api/paths'
import type { FiltroPayload, FiltroResponse } from '@/src/types/filtros'
import { httpClient } from '@/src/services/http/client'

export async function analisarFiltros(
  payload: FiltroPayload,
): Promise<FiltroResponse> {
  const { data } = await httpClient.post<FiltroResponse>(
    API_PATHS.FILTRO,
    payload,
  )
  return data
}
