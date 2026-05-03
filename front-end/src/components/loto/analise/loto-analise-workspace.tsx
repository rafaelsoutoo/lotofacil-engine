'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { useFiltroAnalise } from '@/src/hooks/useFiltroAnalise'
import {
  buildFilterTags,
  emptyFiltroCriteria,
  mergeFiltroRequest,
  type PageSizeOption,
} from '@/src/lib/loto/filtro-criteria'
import type { FiltroCriteria } from '@/src/types/filtros'
import { AnaliseIntroPanel } from './analise-intro-panel'
import { CombinacoesPanel } from './combinacoes-panel'
import { FiltrosDrawer } from './filtros-drawer'

export function LotoAnaliseWorkspace() {
  const [criteria, setCriteria] = useState<FiltroCriteria>(emptyFiltroCriteria)
  const [page, setPage] = useState(1)
  const [pageLimite, setPageLimite] = useState<PageSizeOption>(20)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { data, error, loading, executar } = useFiltroAnalise()

  const refresh = useCallback(() => {
    void executar(mergeFiltroRequest(criteria, page, pageLimite))
  }, [criteria, page, pageLimite, executar])

  useEffect(() => {
    refresh()
  }, [refresh])

  const tags = useMemo(() => buildFilterTags(criteria), [criteria])

  const openDrawer = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const applyCriteria = useCallback((next: FiltroCriteria) => {
    setCriteria(next)
    setPage(1)
    setDrawerOpen(false)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <Box>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'minmax(300px, 400px) minmax(0, 1fr) ',
        }}
        gap={{ base: 6, md: 8 }}
        alignItems="start"
      >
        <CombinacoesPanel
          data={data}
          loading={loading}
          page={page}
          onPageChange={setPage}
          pageLimite={pageLimite}
          onPageLimiteChange={setPageLimite}
        />
        <AnaliseIntroPanel
          tags={tags}
          error={error}
          onOpenFiltros={openDrawer}
        />
      </Grid>

      <FiltrosDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        criteria={criteria}
        onApplyCriteria={applyCriteria}
        onCancel={closeDrawer}
        loading={loading}
      />
    </Box>
  )
}
