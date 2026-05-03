'use client'

import { Button, Dialog, Stack, Text } from '@chakra-ui/react'
import { useEstatisticas } from '@/src/hooks/useEstatisticas'
import { EstatisticasConteudo } from './estatisticas-conteudo'

type EstatisticasRapidoDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EstatisticasRapidoDialog({
  open,
  onOpenChange,
}: EstatisticasRapidoDialogProps) {
  const { soma, sequencia, loading, error, recarregar } = useEstatisticas({
    enabled: open,
  })

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      size="lg"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxH="90vh" display="flex" flexDirection="column">
          <Dialog.Header flexShrink={0}>
            <Dialog.Title>Estatísticas dos concursos</Dialog.Title>
            <Dialog.CloseTrigger />
          </Dialog.Header>
          <Dialog.Body overflowY="auto" flex="1" minH={0}>
            <Stack gap={3}>
              <Text fontSize="sm" color="gray.600">
                Consulta rápida dos mesmos dados da página Estatísticas, sem sair
                dos filtros.
              </Text>
              <EstatisticasConteudo
                soma={soma}
                sequencia={sequencia}
                loading={loading}
                error={error}
              />
            </Stack>
          </Dialog.Body>
          <Dialog.Footer flexShrink={0} gap={2}>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button
              colorPalette="blue"
              loading={loading}
              onClick={() => void recarregar()}
            >
              Atualizar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
