import type { FiltroCriteria } from '@/src/types/filtros'

const FORM_KEYS = [
  'somaMin',
  'somaMax',
  'paresMin',
  'paresMax',
  'maiorSequenciaMin',
  'maiorSequenciaMax',
] as const satisfies ReadonlyArray<keyof FiltroCriteria>

export type FiltroCriteriaFormState = Record<(typeof FORM_KEYS)[number], string>

export function criteriaToForm(c: FiltroCriteria): FiltroCriteriaFormState {
  const out = {} as FiltroCriteriaFormState
  for (const k of FORM_KEYS) {
    const v = c[k]
    out[k] = v === undefined || v === null ? '' : String(v)
  }
  return out
}

export function emptyFiltroCriteriaForm(): FiltroCriteriaFormState {
  return criteriaToForm({})
}

function parseOptionalInt(raw: string | undefined): number | undefined {
  const t = raw?.trim() ?? ''
  if (t === '') return undefined
  const x = Number(t)
  return Number.isFinite(x) ? x : undefined
}

export function parseFormToCriteria(form: FiltroCriteriaFormState): FiltroCriteria {
  return {
    somaMin: parseOptionalInt(form.somaMin),
    somaMax: parseOptionalInt(form.somaMax),
    paresMin: parseOptionalInt(form.paresMin),
    paresMax: parseOptionalInt(form.paresMax),
    maiorSequenciaMin: parseOptionalInt(form.maiorSequenciaMin),
    maiorSequenciaMax: parseOptionalInt(form.maiorSequenciaMax),
  }
}
