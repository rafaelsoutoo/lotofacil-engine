'use client'

import { useCallback, useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import {
  getEstatisticasSequencia,
  getEstatisticasSoma,
} from '@/src/services/estatisticas/estatisticas.service'
import type {
  EstatisticasSequenciaItem,
  EstatisticasSomaResponse,
} from '@/src/types/estatisticas'

export function useEstatisticas() {
  const [soma, setSoma] = useState<EstatisticasSomaResponse | null>(null)
  const [sequencia, setSequencia] = useState<EstatisticasSequenciaItem[] | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [s, seq] = await Promise.all([
        getEstatisticasSoma(),
        getEstatisticasSequencia(),
      ])
      setSoma(s)
      setSequencia(seq)
    } catch (err) {
      if (isAxiosError(err)) {
        setError(
          err.response?.status
            ? `Falha ao carregar (${err.response.status}).`
            : 'Nao foi possivel conectar ao back-end.',
        )
      } else {
        setError('Nao foi possivel carregar as estatisticas.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      void carregar()
    }, 0)
    return () => clearTimeout(t)
  }, [carregar])

  return { soma, sequencia, loading, error, recarregar: carregar }
}
