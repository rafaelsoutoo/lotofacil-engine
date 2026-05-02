'use client'

import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useFiltroAnalise } from '@/src/hooks/useFiltroAnalise'

export function FiltrosPage() {
  const [somaMin, setSomaMin] = useState('170')
  const [somaMax, setSomaMax] = useState('220')
  const [paresMin, setParesMin] = useState('6')
  const [paresMax, setParesMax] = useState('9')
  const [maiorSequenciaMax, setMaiorSequenciaMax] = useState('5')
  const [page, setPage] = useState('1')
  const [pageLimite, setPageLimite] = useState('20')

  const { data, error, loading, executar } = useFiltroAnalise()

  return (
    <Stack gap={6}>
      <Box>
        <Heading size="lg">Filtros combinatorios</Heading>
        <Text mt={2} color="gray.600">
          Analise cartelas da Lotofacil (15 numeros em 25) com filtros no body.
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p={5} bg="white">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Box>
            <Text fontSize="sm" mb={1}>Soma minima</Text>
            <Input value={somaMin} onChange={(e) => setSomaMin(e.target.value)} />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>Soma maxima</Text>
            <Input value={somaMax} onChange={(e) => setSomaMax(e.target.value)} />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>Pares minimo</Text>
            <Input value={paresMin} onChange={(e) => setParesMin(e.target.value)} />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>Pares maximo</Text>
            <Input value={paresMax} onChange={(e) => setParesMax(e.target.value)} />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>Maior sequencia maxima</Text>
            <Input
              value={maiorSequenciaMax}
              onChange={(e) => setMaiorSequenciaMax(e.target.value)}
            />
          </Box>
          <HStack>
            <Box flex="1">
              <Text fontSize="sm" mb={1}>Pagina</Text>
              <Input value={page} onChange={(e) => setPage(e.target.value)} />
            </Box>
            <Box flex="1">
              <Text fontSize="sm" mb={1}>Page limite</Text>
              <Input
                value={pageLimite}
                onChange={(e) => setPageLimite(e.target.value)}
              />
            </Box>
          </HStack>
        </SimpleGrid>

        <Button
          mt={5}
          colorPalette="blue"
          loading={loading}
          onClick={() =>
            executar({
              somaMin: Number(somaMin),
              somaMax: Number(somaMax),
              paresMin: Number(paresMin),
              paresMax: Number(paresMax),
              maiorSequenciaMax: Number(maiorSequenciaMax),
              page: Number(page),
              pageLimite: Number(pageLimite),
            })
          }
        >
          Analisar filtros
        </Button>
      </Box>

      {error ? (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erro na analise</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) : null}

      {data ? (
        <Box borderWidth="1px" borderRadius="lg" p={5} bg="white">
          <Text><b>Total combinacoes:</b> {data.totalCombinacoes}</Text>
          <Text><b>Total filtradas:</b> {data.totalFiltradas}</Text>
          <Text>
            <b>Paginacao:</b> pagina {data.paginacao.page} de {data.paginacao.totalPaginas}
          </Text>
          <Text><b>Cartelas nesta pagina:</b> {data.cartelas.length}</Text>
        </Box>
      ) : null}
    </Stack>
  )
}
