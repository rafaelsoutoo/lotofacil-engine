import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, Min, Max } from 'class-validator'

export class FiltroConcursoDTO {
  // ── Soma ──────────────────────────────────────────────────────────────────
  @ApiPropertyOptional({ description: 'Soma mínima da combinação', example: 140, minimum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(15)
  somaMin?: number

  @ApiPropertyOptional({ description: 'Soma máxima da combinação', example: 230, maximum: 375 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(375)
  somaMax?: number

  // ── Sequência ─────────────────────────────────────────────────────────────
  // ex: maiorSequenciaMax=6 descarta combinações com sequência >= 7
  @ApiPropertyOptional({
    description: 'Menor sequência permitida entre dezenas consecutivas',
    example: 1,
    minimum: 1,
    maximum: 15,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(15)
  maiorSequenciaMin?: number

  @ApiPropertyOptional({
    description: 'Maior sequência permitida entre dezenas consecutivas',
    example: 6,
    minimum: 1,
    maximum: 15,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(15)
  maiorSequenciaMax?: number

  // ── Paridade ──────────────────────────────────────────────────────────────
  @ApiPropertyOptional({ description: 'Quantidade mínima de números pares', example: 5, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  paresMin?: number

  @ApiPropertyOptional({ description: 'Quantidade máxima de números pares', example: 10, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  paresMax?: number

  // ── Faixas ────────────────────────────────────────────────────────────────
  @ApiPropertyOptional({ description: 'Quantidade mínima na faixa 1 a 5', example: 1, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa1a5Min?: number

  @ApiPropertyOptional({ description: 'Quantidade máxima na faixa 1 a 5', example: 4, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa1a5Max?: number

  @ApiPropertyOptional({ description: 'Quantidade mínima na faixa 6 a 10', example: 1, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa6a10Min?: number

  @ApiPropertyOptional({ description: 'Quantidade máxima na faixa 6 a 10', example: 4, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa6a10Max?: number

  @ApiPropertyOptional({ description: 'Quantidade mínima na faixa 11 a 15', example: 1, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa11a15Min?: number

  @ApiPropertyOptional({ description: 'Quantidade máxima na faixa 11 a 15', example: 4, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa11a15Max?: number

  @ApiPropertyOptional({ description: 'Quantidade mínima na faixa 16 a 20', example: 1, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa16a20Min?: number

  @ApiPropertyOptional({ description: 'Quantidade máxima na faixa 16 a 20', example: 4, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa16a20Max?: number

  @ApiPropertyOptional({ description: 'Quantidade mínima na faixa 21 a 25', example: 1, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa21a25Min?: number

  @ApiPropertyOptional({ description: 'Quantidade máxima na faixa 21 a 25', example: 4, minimum: 0, maximum: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(15)
  faixa21a25Max?: number

  @ApiPropertyOptional({
    description: 'Quantidade maxima de cartelas retornadas na resposta',
    example: 200,
    minimum: 1,
    maximum: 5000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5000)
  limiteRetorno?: number
}