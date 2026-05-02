import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FiltroService } from './filtro.service'
import { FiltroConcursoDTO } from './dtos/filtro-concurso.dto'

@ApiTags('filtro')
@Controller('filtro')
export class FiltroController {
  constructor(private readonly filtroService: FiltroService) {}

  @Get()
  @ApiOperation({ summary: 'Filtrar combinações com base em soma, sequência, paridade e faixas' })
  filtrar(@Query() dto: FiltroConcursoDTO) {
    return this.filtroService.filtrar(dto)
  }

  @Get('estatisticas/soma')
  @ApiOperation({ summary: 'Estatísticas de soma dos concursos' })
  estatisticasSoma() {
    return this.filtroService.estatisticasSoma()
  }

  @Get('estatisticas/sequencia')
  @ApiOperation({ summary: 'Estatísticas de sequência dos concursos' })
  estatisticasSequencia() {
    return this.filtroService.estatisticasSequencia()
  }
}
