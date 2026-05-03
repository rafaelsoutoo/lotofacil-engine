import type { FiltroCriteria, FiltroPayload } from '@/src/types/filtros'

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200] as const

export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number]

export type FiltroTag = { key: string; label: string }

export function emptyFiltroCriteria(): FiltroCriteria {
  return {}
}

export function mergeFiltroRequest(
  criteria: FiltroCriteria,
  page: number,
  pageLimite: number,
): FiltroPayload {
  return { ...criteria, page, pageLimite }
}

export function buildFilterTags(criteria: FiltroCriteria): FiltroTag[] {
  const tags: FiltroTag[] = []

  if (criteria.somaMin != null || criteria.somaMax != null) {
    tags.push({
      key: 'soma',
      label: `Soma ${criteria.somaMin ?? '—'}–${criteria.somaMax ?? '—'}`,
    })
  }

  if (criteria.paresMin != null || criteria.paresMax != null) {
    tags.push({
      key: 'pares',
      label: `Pares ${criteria.paresMin ?? '—'}–${criteria.paresMax ?? '—'}`,
    })
  }

  if (
    criteria.maiorSequenciaMin != null ||
    criteria.maiorSequenciaMax != null
  ) {
    const min = criteria.maiorSequenciaMin
    const max = criteria.maiorSequenciaMax
    if (min != null && max != null) {
      tags.push({
        key: 'sequencia',
        label: `Maior sequência ${min}–${max}`,
      })
    } else if (max != null) {
      tags.push({
        key: 'sequencia',
        label: `Maior sequência ≤ ${max}`,
      })
    } else if (min != null) {
      tags.push({
        key: 'sequencia',
        label: `Maior sequência ≥ ${min}`,
      })
    }
  }

  const faixa = (key: string, label: string, min?: number, max?: number) => {
    if (min != null || max != null) {
      tags.push({
        key,
        label: `${label} ${min ?? '—'}–${max ?? '—'}`,
      })
    }
  }

  faixa('f1', 'Bloco 1–5', criteria.faixa1a5Min, criteria.faixa1a5Max)
  faixa('f2', 'Bloco 6–10', criteria.faixa6a10Min, criteria.faixa6a10Max)
  faixa('f3', 'Bloco 11–15', criteria.faixa11a15Min, criteria.faixa11a15Max)
  faixa('f4', 'Bloco 16–20', criteria.faixa16a20Min, criteria.faixa16a20Max)
  faixa('f5', 'Bloco 21–25', criteria.faixa21a25Min, criteria.faixa21a25Max)

  return tags
}
