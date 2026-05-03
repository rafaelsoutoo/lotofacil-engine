import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import { ChakraRootProvider } from '@/src/components/providers/chakra-provider'
import { AppHeader } from '@/src/components/layout/app-header'
import '@/src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraRootProvider>
      <Head>
        <title>Loto Fácil</title>
        <meta
          name="description"
          content="Front-end de análise combinatória da Lotofácil"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box minH="100dvh" bg="gray.50">
        <AppHeader />
        <Container maxW="7xl" py={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraRootProvider>
  )
}
