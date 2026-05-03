'use client'

import { useState } from 'react'
import { useFiltroAnalise } from '@/src/hooks/useFiltroAnalise'

const fieldClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

const labelClass = 'block text-sm font-medium text-slate-700'

export function FiltrosPage() {
  const [somaMin, setSomaMin] = useState('170')
  const [somaMax, setSomaMax] = useState('220')
  const [paresMin, setParesMin] = useState('6')
  const [paresMax, setParesMax] = useState('9')
  const [maiorSequenciaMax, setMaiorSequenciaMax] = useState('5')
  const [page, setPage] = useState('1')
  const [pageLimite, setPageLimite] = useState('20')

  const { data, error, loading, executar } = useFiltroAnalise()

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">
          Filtros combinatorios
        </h1>
        <p className="mt-2 text-slate-600">
          Analise cartelas da Lotofacil (15 numeros em 25) com filtros no body.
        </p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Soma minima</label>
            <input
              className={fieldClass}
              value={somaMin}
              onChange={(e) => setSomaMin(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Soma maxima</label>
            <input
              className={fieldClass}
              value={somaMax}
              onChange={(e) => setSomaMax(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Pares minimo</label>
            <input
              className={fieldClass}
              value={paresMin}
              onChange={(e) => setParesMin(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Pares maximo</label>
            <input
              className={fieldClass}
              value={paresMax}
              onChange={(e) => setParesMax(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Maior sequencia maxima</label>
            <input
              className={fieldClass}
              value={maiorSequenciaMax}
              onChange={(e) => setMaiorSequenciaMax(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div>
              <label className={labelClass}>Pagina</label>
              <input
                className={fieldClass}
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Page limite</label>
              <input
                className={fieldClass}
                value={pageLimite}
                onChange={(e) => setPageLimite(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={loading}
          className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() =>
            executar({
              somaMin: Number(somaMin),
              somaMax: Number(somaMax),
              paresMin: Number(paresMin),
              paresMax: Number(paresMax),
              maiorSequenciaMax: Number(maiorSequenciaMax),
              page: Number(page),
              pageLimite: Number(pageLimite),
            })
          }
        >
          {loading ? 'Analisando…' : 'Analisar filtros'}
        </button>
      </section>

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900"
        >
          <p className="font-semibold">Erro na analise</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      ) : null}

      {data ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p>
            <span className="font-semibold">Total combinacoes:</span>{' '}
            {data.totalCombinacoes}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Total filtradas:</span>{' '}
            {data.totalFiltradas}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Paginacao:</span> pagina{' '}
            {data.paginacao.page} de {data.paginacao.totalPaginas}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Cartelas nesta pagina:</span>{' '}
            {data.cartelas.length}
          </p>
        </section>
      ) : null}
    </div>
  )
}
