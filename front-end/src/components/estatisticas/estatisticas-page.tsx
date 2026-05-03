'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEstatisticas } from '@/src/hooks/useEstatisticas'
import { EstatisticasConteudo } from './estatisticas-conteudo'

export function EstatisticasPage() {
  const { soma, sequencia, loading, error, recarregar } = useEstatisticas()

  return (
    <Container maxW="6xl" py={8}>
      <Stack gap={8}>
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

        <EstatisticasConteudo
          soma={soma}
          sequencia={sequencia}
          loading={loading}
          error={error}
        />
      </Stack>
    </Container>
  )
}
