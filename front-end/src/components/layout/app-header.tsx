'use client'

import NextLink from 'next/link'
import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react'
import { ROUTES } from '@/src/routes'

export function AppHeader() {
  return (
    <Box as="header" borderBottomWidth="1px" borderColor="gray.200" bg="white">
      <Container maxW="7xl" py={3}>
        <Flex align="center" justify="space-between" gap={4}>
          <Heading as="h1" size="md" fontWeight="semibold">
            <Button asChild variant="ghost" size="sm" px={2}>
              <NextLink href={ROUTES.HOME}>Loto Fácil</NextLink>
            </Button>
          </Heading>
          <Flex gap={1}>
            <Button asChild variant="ghost" size="sm">
              <NextLink href={ROUTES.HOME}>Análise</NextLink>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <NextLink href={ROUTES.ESTATISTICAS}>Estatísticas</NextLink>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
