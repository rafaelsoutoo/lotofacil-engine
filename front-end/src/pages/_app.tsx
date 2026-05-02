import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Geist, Geist_Mono } from 'next/font/google'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import '@/src/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-full`}>
      <ChakraProvider value={defaultSystem}>
        <Head>
          <title>Loto Fácil</title>
          <meta
            name="description"
            content="Front-end de análise combinatória da Lotofácil"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  )
}
