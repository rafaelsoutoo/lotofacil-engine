'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Drawer,
  Field,
  Input,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { EstatisticasRapidoDialog } from '@/src/components/estatisticas/estatisticas-rapido-dialog'
import {
  criteriaToForm,
  emptyFiltroCriteriaForm,
  parseFormToCriteria,
  type FiltroCriteriaFormState,
} from '@/src/lib/loto/filtro-criteria-form'
import type { FiltroCriteria } from '@/src/types/filtros'

type FiltrosDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  criteria: FiltroCriteria
  onApplyCriteria: (next: FiltroCriteria) => void
  onCancel: () => void
  loading: boolean
}

export function FiltrosDrawer({
  open,
  onOpenChange,
  criteria,
  onApplyCriteria,
  onCancel,
  loading,
}: FiltrosDrawerProps) {
  const [form, setForm] = useState<FiltroCriteriaFormState>(emptyFiltroCriteriaForm)
  const [estatisticasOpen, setEstatisticasOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    const id = requestAnimationFrame(() => {
      if (!cancelled) setForm(criteriaToForm(criteria))
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(id)
    }
  }, [open, criteria])

  const setField = (key: keyof FiltroCriteriaFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onApplyCriteria(parseFormToCriteria(form))
  }

  return (
    <>
      <Drawer.Root
        open={open}
        onOpenChange={(e) => {
          if (!e.open) setEstatisticasOpen(false)
          onOpenChange(e.open)
        }}
        placement="end"
        size="md"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Filtros</Drawer.Title>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap={6}>
                <Stack gap={2}>
                  <Text fontSize="sm" color="gray.600">
                    Use os campos para restringir combinações. Para ver como as
                    somas e sequências se distribuem nos concursos já gravados,
                    abra as estatísticas sem sair desta tela.
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    w="fit-content"
                    onClick={() => setEstatisticasOpen(true)}
                  >
                    Ver estatísticas
                  </Button>
                </Stack>

                <Separator />

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <Field.Root>
                    <Field.Label>Soma mínima</Field.Label>
                    <Input
                      value={form.somaMin}
                      onChange={(e) => setField('somaMin', e.target.value)}
                      placeholder="opcional"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Soma máxima</Field.Label>
                    <Input
                      value={form.somaMax}
                      onChange={(e) => setField('somaMax', e.target.value)}
                      placeholder="opcional"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Pares mínimo</Field.Label>
                    <Input
                      value={form.paresMin}
                      onChange={(e) => setField('paresMin', e.target.value)}
                      placeholder="opcional"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Pares máximo</Field.Label>
                    <Input
                      value={form.paresMax}
                      onChange={(e) => setField('paresMax', e.target.value)}
                      placeholder="opcional"
                    />
                  </Field.Root>
                  <Field.Root gridColumn={{ sm: 'span 2' }}>
                    <Field.Label>Maior sequência mínima (opcional)</Field.Label>
                    <Input
                      value={form.maiorSequenciaMin}
                      onChange={(e) =>
                        setField('maiorSequenciaMin', e.target.value)
                      }
                      placeholder="vazio = ignorar"
                    />
                  </Field.Root>
                  <Field.Root gridColumn={{ sm: 'span 2' }}>
                    <Field.Label>Maior sequência máxima</Field.Label>
                    <Input
                      value={form.maiorSequenciaMax}
                      onChange={(e) =>
                        setField('maiorSequenciaMax', e.target.value)
                      }
                      placeholder="opcional"
                    />
                  </Field.Root>
                </SimpleGrid>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer display="flex" gap={2}>
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button colorPalette="blue" loading={loading} onClick={handleApply}>
                Aplicar
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <EstatisticasRapidoDialog
        open={estatisticasOpen}
        onOpenChange={setEstatisticasOpen}
      />
    </>
  )
}
