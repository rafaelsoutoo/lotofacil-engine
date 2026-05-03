'use client'

import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { analisarFiltros } from '@/src/services/filtros/filtros.service'
import type { FiltroPayload, FiltroResponse } from '@/src/types/filtros'

export function useFiltroAnalise() {
  const [data, setData] = useState<FiltroResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executar = useCallback(async (payload: FiltroPayload) => {
    setLoading(true)
    setError(null)

    try {
      const response = await analisarFiltros(payload)
      setData(response)
    } catch (err) {
      if (isAxiosError(err)) {
        const backendMessage =
          typeof err.response?.data?.message === 'string'
            ? err.response.data.message
            : null

        if (backendMessage) {
          setError(backendMessage)
        } else if (err.response?.status) {
          setError(`Falha na requisicao (${err.response.status}).`)
        } else {
          setError('Nao foi possivel conectar ao back-end.')
        }
      } else {
        setError('Nao foi possivel analisar os filtros agora.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data,
    loading,
    error,
    executar,
  }
}
