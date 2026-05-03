'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Input,
  NativeSelect,
  Separator,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import {
  PAGE_SIZE_OPTIONS,
  type PageSizeOption,
} from '@/src/lib/loto/filtro-criteria'
import type { FiltroResponse } from '@/src/types/filtros'

const nf = new Intl.NumberFormat('pt-BR')

type CombinacoesPanelProps = {
  data: FiltroResponse | null
  loading: boolean
  page: number
  onPageChange: (page: number) => void
  pageLimite: PageSizeOption
  onPageLimiteChange: (limite: PageSizeOption) => void
}

export function CombinacoesPanel({
  data,
  loading,
  page,
  onPageChange,
  pageLimite,
  onPageLimiteChange,
}: CombinacoesPanelProps) {
  return (
    <Card.Root
      position={{ md: 'sticky' }}
      top={{ md: 4 }}
      maxH={{ md: 'calc(100vh - 6rem)' }}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      minW={0}
      w="full"
    >
      <Card.Header pb={2}>
        <Card.Title>Possibilidades</Card.Title>
        <Card.Description>
          Dados do endpoint{' '}
          <Text as="span" fontWeight="medium">
            POST /filtro
          </Text>
        </Card.Description>
      </Card.Header>
      <Card.Body flex="0" pb={3}>
        <Stack gap={2} fontSize="sm">
          <HStack justify="space-between">
            <Text color="gray.600">Universo</Text>
            <Text fontWeight="medium">
              {data ? nf.format(data.totalCombinacoes) : '—'}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text color="gray.600">Filtradas</Text>
            <Text fontWeight="medium">
              {data ? nf.format(data.totalFiltradas) : '—'}
            </Text>
          </HStack>
          {data ? (
            <Text fontSize="xs" color="gray.600">
              Página {data.paginacao.page} de{' '}
              {nf.format(data.paginacao.totalPaginas)} ·{' '}
              {data.paginacao.pageLimite} por página
            </Text>
          ) : null}
        </Stack>
      </Card.Body>

      <Separator />

      <Card.Body flex="0" py={3}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
          <Box>
            <Text fontSize="xs" color="gray.600" mb={1}>
              Página
            </Text>
            <Input
              type="number"
              min={1}
              size="sm"
              disabled={loading || !data}
              value={page}
              onChange={(e) => {
                const v = Math.max(1, Number(e.target.value) || 1)
                onPageChange(v)
              }}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.600" mb={1}>
              Itens / página
            </Text>
            <NativeSelect.Root size="sm" disabled={loading}>
              <NativeSelect.Field
                value={String(pageLimite)}
                onChange={(e) => {
                  onPageLimiteChange(Number(e.target.value) as PageSizeOption)
                  onPageChange(1)
                }}
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
        </SimpleGrid>
        <HStack mt={3} justify="flex-end" gap={2}>
          <Button
            size="sm"
            variant="outline"
            disabled={loading || !data?.paginacao.temAnterior}
            onClick={() => onPageChange(page - 1)}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={loading || !data?.paginacao.temProxima}
            onClick={() => onPageChange(page + 1)}
          >
            Próxima
          </Button>
        </HStack>
      </Card.Body>

      <Separator />

      <Card.Body flex="1" minH={0} overflowY="auto" py={2}>
        {loading && !data ? (
          <Flex justify="center" py={10}>
            <Spinner />
          </Flex>
        ) : null}
        {data && data.cartelas.length === 0 && !loading ? (
          <Text textAlign="center" color="gray.600" py={6} fontSize="sm">
            Nenhuma cartela nesta página.
          </Text>
        ) : null}
        {data && data.cartelas.length > 0 ? (
          <Stack gap={2} pr={1}>
            {data.cartelas.map((c, i) => (
              <Box
                key={`${c.dezenas.join('-')}-${i}`}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.100"
                bg="gray.50"
                p={2}
              >
                <Wrap gap={1}>
                  {c.dezenas.map((d) => (
                    <WrapItem key={d}>
                      <Badge variant="outline" colorPalette="gray" px={1.5}>
                        {d}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
                <Text fontSize="2xs" color="gray.600" mt={1}>
                  #{(page - 1) * pageLimite + i + 1} · soma {c.soma} · pares{' '}
                  {c.pares} · seq. máx. {c.maiorSequencia}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : null}
      </Card.Body>
    </Card.Root>
  )
}
