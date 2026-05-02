import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { EstatisticasService } from './estatisticas.service'

@ApiTags('estatisticas')
@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @Get('soma')
  @ApiOperation({ summary: 'Estatísticas de soma dos concursos (média, mínimo e máximo)' })
  soma() {
    return this.estatisticasService.soma()
  }

  @Get('sequencia')
  @ApiOperation({ summary: 'Estatísticas de sequência dos concursos' })
  sequencia() {
    return this.estatisticasService.sequencia()
  }
}
