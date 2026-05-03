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

type UseEstatisticasOptions = {
  /** Se false, não busca até virar true (ex.: modal fechado). Padrão: true. */
  enabled?: boolean
}

export function useEstatisticas(options?: UseEstatisticasOptions) {
  const enabled = options?.enabled ?? true

  const [soma, setSoma] = useState<EstatisticasSomaResponse | null>(null)
  const [sequencia, setSequencia] = useState<EstatisticasSequenciaItem[] | null>(
    null,
  )
  const [loading, setLoading] = useState(() => enabled)
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
    if (!enabled) return
    const id = window.setTimeout(() => {
      void carregar()
    }, 0)
    return () => window.clearTimeout(id)
  }, [enabled, carregar])

  return { soma, sequencia, loading, error, recarregar: carregar }
}
