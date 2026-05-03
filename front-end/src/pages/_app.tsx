import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-full">
      <Head>
        <title>Loto Fácil</title>
        <meta
          name="description"
          content="Front-end de análise combinatória da Lotofácil"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
