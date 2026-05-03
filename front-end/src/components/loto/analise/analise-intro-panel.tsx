'use client'

import { memo } from 'react'
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

function AnaliseIntroPanelImpl({
  tags,
  error,
  onOpenFiltros,
}: AnaliseIntroPanelProps) {
  return (
    <Stack gap={6}>
      <Box>
        <Heading size="lg">Análise combinatória</Heading>
        <Text mt={2} color="gray.600">
          Lotofácil: 15 dezenas em 25. Ajuste filtros quando quiser; a lista de
          possibilidades atualiza só após aplicar.
        </Text>
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

export const AnaliseIntroPanel = memo(AnaliseIntroPanelImpl)
