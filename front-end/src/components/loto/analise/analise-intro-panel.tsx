'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import type { FiltroTag } from '@/src/lib/loto/filtro-criteria'

type AnaliseIntroPanelProps = {
  tags: FiltroTag[]
  error: string | null
  onOpenFiltros: () => void
}

export function AnaliseIntroPanel({
  tags,
  error,
  onOpenFiltros,
}: AnaliseIntroPanelProps) {
  return (
    <Stack gap={6}>
      <Box>
        <Heading size="lg">Análise combinatória</Heading>
        
      </Box>

      {tags.length === 0 ? (
        <Text fontSize="sm" color="gray.500">
          Nenhum filtro aplicado.
        </Text>
      ) : (
        <Wrap gap={2} aria-label="Filtros ativos">
          {tags.map((t) => (
            <WrapItem key={t.key}>
              <Badge variant="subtle" colorPalette="blue" px={3} py={1}>
                {t.label}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <Flex justify={{ base: 'stretch', sm: 'flex-start' }} py={{ base: 4, md: 6 }}>
        <Button colorPalette="blue" size="lg" onClick={onOpenFiltros} w={{ base: 'full', sm: 'auto' }}>
          Filtros
        </Button>
      </Flex>

      {error ? (
        <Card.Root borderColor="red.200" bg="red.50">
          <Card.Body>
            <Text fontWeight="semibold" color="red.800">
              Erro na análise
            </Text>
            <Text fontSize="sm" color="red.700" mt={1}>
              {error}
            </Text>
          </Card.Body>
        </Card.Root>
      ) : null}
    </Stack>
  )
}
