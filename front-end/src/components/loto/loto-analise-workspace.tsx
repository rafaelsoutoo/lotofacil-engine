'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  Drawer,
  Field,
  Flex,
  Grid,
  Heading,
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
import { useFiltroAnalise } from '@/src/hooks/useFiltroAnalise'
import {
  buildFilterTags,
  defaultCriteria,
  mergeFiltroRequest,
  PAGE_SIZE_OPTIONS,
  type FiltroCriteria,
  type PageSizeOption,
} from '@/src/routes'

const nf = new Intl.NumberFormat('pt-BR')

function criteriaToForm(c: FiltroCriteria): Record<string, string> {
  const keys = [
    'somaMin',
    'somaMax',
    'paresMin',
    'paresMax',
    'maiorSequenciaMin',
    'maiorSequenciaMax',
  ] as const
  const out: Record<string, string> = {}
  for (const k of keys) {
    const v = c[k]
    out[k] = v === undefined || v === null ? '' : String(v)
  }
  return out
}

function parseFormToCriteria(form: Record<string, string>): FiltroCriteria {
  const n = (key: string): number | undefined => {
    const t = form[key]?.trim() ?? ''
    if (t === '') return undefined
    const x = Number(t)
    return Number.isFinite(x) ? x : undefined
  }

  const d = defaultCriteria()
  return {
    ...d,
    somaMin: n('somaMin') ?? d.somaMin,
    somaMax: n('somaMax') ?? d.somaMax,
    paresMin: n('paresMin') ?? d.paresMin,
    paresMax: n('paresMax') ?? d.paresMax,
    maiorSequenciaMin: n('maiorSequenciaMin'),
    maiorSequenciaMax: n('maiorSequenciaMax') ?? d.maiorSequenciaMax,
  }
}

export function LotoAnaliseWorkspace() {
  const [criteria, setCriteria] = useState<FiltroCriteria>(defaultCriteria)
  const [page, setPage] = useState(1)
  const [pageLimite, setPageLimite] = useState<PageSizeOption>(20)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState<Record<string, string>>(() =>
    criteriaToForm(defaultCriteria()),
  )

  const { data, error, loading, executar } = useFiltroAnalise()

  const refresh = useCallback(() => {
    void executar(mergeFiltroRequest(criteria, page, pageLimite))
  }, [criteria, page, pageLimite, executar])

  useEffect(() => {
    refresh()
  }, [refresh])

  const tags = useMemo(() => buildFilterTags(criteria), [criteria])

  const openDrawer = () => {
    setForm(criteriaToForm(criteria))
    setDrawerOpen(true)
  }

  const applyDrawer = () => {
    const next = parseFormToCriteria(form)
    setCriteria(next)
    setPage(1)
    setDrawerOpen(false)
  }

  const setField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Box>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 400px' }}
        gap={{ base: 6, lg: 8 }}
        alignItems="start"
      >
        <Stack gap={6}>
          <Box>
            <Heading size="lg">Análise combinatória</Heading>
            <Text mt={2} color="gray.600">
              Lotofácil: 15 dezenas em 25. Ajuste filtros no painel lateral e
              veja as combinações paginadas à direita.
            </Text>
          </Box>

          <Wrap gap={2} aria-label="Filtros ativos">
            {tags.map((t) => (
              <WrapItem key={t.key}>
                <Badge variant="subtle" colorPalette="blue" px={3} py={1}>
                  {t.label}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>

          <Flex justify="center" py={{ base: 8, md: 12 }}>
            <Button colorPalette="blue" size="lg" onClick={openDrawer}>
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

        <Card.Root
          position={{ lg: 'sticky' }}
          top={{ lg: 4 }}
          maxH={{ lg: 'calc(100vh - 6rem)' }}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Card.Header pb={2}>
            <Card.Title>Combinações</Card.Title>
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
              <Field.Root>
                <Field.Label fontSize="xs">Página</Field.Label>
                <Input
                  type="number"
                  min={1}
                  size="sm"
                  disabled={loading || !data}
                  value={page}
                  onChange={(e) => {
                    const v = Math.max(1, Number(e.target.value) || 1)
                    setPage(v)
                  }}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label fontSize="xs">Itens / página</Field.Label>
                <NativeSelect.Root size="sm" disabled={loading}>
                  <NativeSelect.Field
                    value={String(pageLimite)}
                    onChange={(e) => {
                      setPageLimite(Number(e.target.value) as PageSizeOption)
                      setPage(1)
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
              </Field.Root>
            </SimpleGrid>
            <HStack mt={3} justify="flex-end" gap={2}>
              <Button
                size="sm"
                variant="outline"
                disabled={loading || !data?.paginacao.temAnterior}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={loading || !data?.paginacao.temProxima}
                onClick={() => setPage((p) => p + 1)}
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
      </Grid>

      <Drawer.Root
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
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
                    value={form.somaMin ?? ''}
                    onChange={(e) => setField('somaMin', e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Soma máxima</Field.Label>
                  <Input
                    value={form.somaMax ?? ''}
                    onChange={(e) => setField('somaMax', e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Pares mínimo</Field.Label>
                  <Input
                    value={form.paresMin ?? ''}
                    onChange={(e) => setField('paresMin', e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Pares máximo</Field.Label>
                  <Input
                    value={form.paresMax ?? ''}
                    onChange={(e) => setField('paresMax', e.target.value)}
                  />
                </Field.Root>
                <Field.Root gridColumn={{ sm: 'span 2' }}>
                  <Field.Label>Maior sequência mínima (opcional)</Field.Label>
                  <Input
                    value={form.maiorSequenciaMin ?? ''}
                    onChange={(e) =>
                      setField('maiorSequenciaMin', e.target.value)
                    }
                    placeholder="vazio = ignorar"
                  />
                </Field.Root>
                <Field.Root gridColumn={{ sm: 'span 2' }}>
                  <Field.Label>Maior sequência máxima</Field.Label>
                  <Input
                    value={form.maiorSequenciaMax ?? ''}
                    onChange={(e) =>
                      setField('maiorSequenciaMax', e.target.value)
                    }
                  />
                </Field.Root>
              </SimpleGrid>
            </Drawer.Body>
            <Drawer.Footer display="flex" gap={2}>
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                Cancelar
              </Button>
              <Button
                colorPalette="blue"
                loading={loading}
                onClick={applyDrawer}
              >
                Aplicar
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  )
}
