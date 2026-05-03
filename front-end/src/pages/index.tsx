import Link from 'next/link'
import { ROUTES } from '@/src/routes'

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Loto Facil - Front-end
      </h1>
      <p className="mt-3 text-slate-600">
        Estrutura profissional com paginas, componentes, hooks e services.
      </p>
      <Link
        href={ROUTES.FILTROS}
        className="mt-6 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ir para pagina de filtros
      </Link>
    </main>
  )
}
