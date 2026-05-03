'use client'

import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Stat,
  Table,
  Text,
} from '@chakra-ui/react'
import type {
  EstatisticasSequenciaItem,
  EstatisticasSomaResponse,
} from '@/src/types/estatisticas'

const nf = new Intl.NumberFormat('pt-BR')

export type EstatisticasConteudoProps = {
  soma: EstatisticasSomaResponse | null
  sequencia: EstatisticasSequenciaItem[] | null
  loading: boolean
  error: string | null
}

export function EstatisticasConteudo({
  soma,
  sequencia,
  loading,
  error,
}: EstatisticasConteudoProps) {
  return (
    <Stack gap={6}>
      {error ? (
        <Card.Root borderColor="red.200" bg="red.50">
          <Card.Body>
            <Text fontWeight="semibold" color="red.800">
              Erro
            </Text>
            <Text fontSize="sm" color="red.700" mt={1}>
              {error}
            </Text>
          </Card.Body>
        </Card.Root>
      ) : null}

      {loading && !soma ? (
        <Box textAlign="center" py={10}>
          <Spinner size="lg" />
        </Box>
      ) : null}

      {soma ? (
        <Stack gap={4}>
          <Heading size="sm">Soma das cartelas (concursos)</Heading>
          <Text fontSize="xs" color="gray.600">
            Fonte:{' '}
            <Text as="span" fontWeight="medium">
              GET /estatisticas/soma
            </Text>
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={3}>
            <Stat.Root borderWidth="1px" borderRadius="md" p={3}>
              <Stat.Label>Média</Stat.Label>
              <Stat.ValueText>{nf.format(soma.media)}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" borderRadius="md" p={3}>
              <Stat.Label>Mínimo</Stat.Label>
              <Stat.ValueText>{nf.format(soma.min)}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" borderRadius="md" p={3}>
              <Stat.Label>Máximo</Stat.Label>
              <Stat.ValueText>{nf.format(soma.max)}</Stat.ValueText>
            </Stat.Root>
          </SimpleGrid>

          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Faixa</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Quantidade
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Percentual
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {soma.distribuicao.map((row) => (
                <Table.Row key={row.faixa}>
                  <Table.Cell>{row.faixa}</Table.Cell>
                  <Table.Cell textAlign="end">
                    {nf.format(row.quantidade)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">{row.percentual}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      ) : null}

      {sequencia && sequencia.length > 0 ? (
        <Stack gap={4}>
          <Heading size="sm">Maior sequência (concursos)</Heading>
          <Text fontSize="xs" color="gray.600">
            Fonte:{' '}
            <Text as="span" fontWeight="medium">
              GET /estatisticas/sequencia
            </Text>
          </Text>
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Sequência</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Quantidade
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Percentual
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sequencia.map((row) => (
                <Table.Row key={row.sequencia}>
                  <Table.Cell>{row.sequencia}</Table.Cell>
                  <Table.Cell textAlign="end">
                    {nf.format(row.quantidade)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">{row.percentual}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      ) : null}
    </Stack>
  )
}
