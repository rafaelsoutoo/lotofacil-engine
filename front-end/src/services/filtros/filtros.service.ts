import { httpClient } from '@/src/services/http/client'
import { FiltroPayload, FiltroResponse } from '@/src/types/filtros'

export async function analisarFiltros(
  payload: FiltroPayload,
): Promise<FiltroResponse> {
  const { data } = await httpClient.post<FiltroResponse>('/filtro', payload)
  return data
}
