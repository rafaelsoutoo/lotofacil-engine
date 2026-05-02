'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export function AppChakraProvider({ children }: Props) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}
