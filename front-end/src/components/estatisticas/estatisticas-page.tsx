'use client'

import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Stat,
  Table,
  Text,
} from '@chakra-ui/react'
import { useEstatisticas } from '@/src/hooks/useEstatisticas'

const nf = new Intl.NumberFormat('pt-BR')

export function EstatisticasPage() {
  const { soma, sequencia, loading, error, recarregar } = useEstatisticas()

  return (
    <Container maxW="6xl" py={8}>
      <Stack gap={8}>
        <FlexHeading recarregar={recarregar} loading={loading} />

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
          <Box textAlign="center" py={16}>
            <Spinner size="lg" />
          </Box>
        ) : null}

        {soma ? (
          <Stack gap={4}>
            <Heading size="md">Soma das cartelas (concursos)</Heading>
            <Text fontSize="sm" color="gray.600">
              Fonte: <Text as="span" fontWeight="medium">GET /estatisticas/soma</Text>
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
              <Stat.Root borderWidth="1px" borderRadius="md" p={4}>
                <Stat.Label>Média</Stat.Label>
                <Stat.ValueText>{nf.format(soma.media)}</Stat.ValueText>
              </Stat.Root>
              <Stat.Root borderWidth="1px" borderRadius="md" p={4}>
                <Stat.Label>Mínimo</Stat.Label>
                <Stat.ValueText>{nf.format(soma.min)}</Stat.ValueText>
              </Stat.Root>
              <Stat.Root borderWidth="1px" borderRadius="md" p={4}>
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
            <Heading size="md">Maior sequência (concursos)</Heading>
            <Text fontSize="sm" color="gray.600">
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
    </Container>
  )
}

function FlexHeading({
  recarregar,
  loading,
}: {
  recarregar: () => void
  loading: boolean
}) {
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      align={{ sm: 'center' }}
      justify="space-between"
      gap={4}
    >
      <Box>
        <Heading size="lg">Estatísticas</Heading>
        <Text mt={1} color="gray.600" fontSize="sm">
          Dados agregados dos concursos persistidos no back-end.
        </Text>
      </Box>
      <Button
        variant="outline"
        size="sm"
        loading={loading}
        onClick={() => void recarregar()}
      >
        Atualizar
      </Button>
    </Stack>
  )
}
