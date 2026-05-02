import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FiltroService } from './filtro.service'
import { FiltroConcursoDTO } from './dtos/filtro-concurso.dto'
import { ApiFiltroQueries } from './decorators/api-filtro-queries.decorator'

@ApiTags('filtros')
@Controller('filtro')
export class FiltroController {
  constructor(private readonly filtroService: FiltroService) {}

  @Get()
  @ApiOperation({
    summary:
      'Filtrar cartelas combinatorias da Lotofacil (15 dezenas entre 1 e 25)',
  })
  @ApiFiltroQueries()
  filtrar(@Query() dto: FiltroConcursoDTO) {
    return this.filtroService.filtrar(dto)
  }
}
