import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FiltroService } from './filtro.service'
import { FiltroConcursoDTO } from './dtos/filtro-concurso.dto'

@ApiTags('filtros')
@Controller('filtro')
export class FiltroController {
  constructor(private readonly filtroService: FiltroService) { }

  @Post()
  @ApiOperation({
    summary:
      'Endpoint principal para analise combinatoria da Lotofacil',
    description: 'Endpoint principal para analise combinatoria da Lotofacil',
  })
  @ApiBody({
    type: FiltroConcursoDTO,
    required: false,
    description: 'Filtros para reduzir cartelas (15 dezenas entre 1 e 25)',
    examples: {
      exemploCompleto: {
        summary: 'Exemplo com filtros e paginacao',
        value: {
          somaMin: 170,
          somaMax: 220,
          maiorSequenciaMax: 5,
          paresMin: 6,
          paresMax: 9,
          faixa1a5Min: 1,
          faixa1a5Max: 4,
          faixa6a10Min: 1,
          faixa6a10Max: 4,
          faixa11a15Min: 1,
          faixa11a15Max: 4,
          faixa16a20Min: 1,
          faixa16a20Max: 4,
          faixa21a25Min: 1,
          faixa21a25Max: 4,
          page: 1,
          pageLimite: 200,
        },
      },
    },
  })
  analisar(@Body() dto: FiltroConcursoDTO) {
    return this.filtroService.filtrar(dto)
  }

}
