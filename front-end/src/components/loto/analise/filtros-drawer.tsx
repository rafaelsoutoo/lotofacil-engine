'use client'

import {
  Button,
  Drawer,
  Field,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import type { FiltroCriteriaFormState } from '@/src/lib/loto/filtro-criteria-form'

type FiltrosDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: FiltroCriteriaFormState
  onFieldChange: (key: keyof FiltroCriteriaFormState, value: string) => void
  onApply: () => void
  onCancel: () => void
  loading: boolean
}

export function FiltrosDrawer({
  open,
  onOpenChange,
  form,
  onFieldChange,
  onApply,
  onCancel,
  loading,
}: FiltrosDrawerProps) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
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
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
              <Field.Root>
                <Field.Label>Soma mínima</Field.Label>
                <Input
                  value={form.somaMin}
                  onChange={(e) => onFieldChange('somaMin', e.target.value)}
                  placeholder="opcional"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Soma máxima</Field.Label>
                <Input
                  value={form.somaMax}
                  onChange={(e) => onFieldChange('somaMax', e.target.value)}
                  placeholder="opcional"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Pares mínimo</Field.Label>
                <Input
                  value={form.paresMin}
                  onChange={(e) => onFieldChange('paresMin', e.target.value)}
                  placeholder="opcional"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Pares máximo</Field.Label>
                <Input
                  value={form.paresMax}
                  onChange={(e) => onFieldChange('paresMax', e.target.value)}
                  placeholder="opcional"
                />
              </Field.Root>
              <Field.Root gridColumn={{ sm: 'span 2' }}>
                <Field.Label>Maior sequência mínima (opcional)</Field.Label>
                <Input
                  value={form.maiorSequenciaMin}
                  onChange={(e) =>
                    onFieldChange('maiorSequenciaMin', e.target.value)
                  }
                  placeholder="vazio = ignorar"
                />
              </Field.Root>
              <Field.Root gridColumn={{ sm: 'span 2' }}>
                <Field.Label>Maior sequência máxima</Field.Label>
                <Input
                  value={form.maiorSequenciaMax}
                  onChange={(e) =>
                    onFieldChange('maiorSequenciaMax', e.target.value)
                  }
                  placeholder="opcional"
                />
              </Field.Root>
            </SimpleGrid>
          </Drawer.Body>
          <Drawer.Footer display="flex" gap={2}>
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button colorPalette="blue" loading={loading} onClick={onApply}>
              Aplicar
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}
