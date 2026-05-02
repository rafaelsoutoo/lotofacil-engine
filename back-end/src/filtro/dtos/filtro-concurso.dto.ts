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

  // Divide os 25 números em 5 blocos de 5 e conta quantos foram sorteados em cada bloco.
  // Exemplo real: dezenas [1, 3, 7, 9, 12, 14, 16, 18, 20, 21, 22, 23, 24, 25, ??]
  //
  //   faixa1a5   → conta dezenas entre  1 e  5  (ex: saíram 1 e 3        → faixa1a5   = 2)
  //   faixa6a10  → conta dezenas entre  6 e 10  (ex: saíram 7 e 9        → faixa6a10  = 2)
  //   faixa11a15 → conta dezenas entre 11 e 15  (ex: saíram 12 e 14      → faixa11a15 = 2)
  //   faixa16a20 → conta dezenas entre 16 e 20  (ex: saíram 16, 18 e 20  → faixa16a20 = 3)
  //   faixa21a25 → conta dezenas entre 21 e 25  (ex: saíram 21,22,23,24  → faixa21a25 = 4)
  //                                               total = 2+2+2+3+4 = 13... faltam 2 dezenas
  //
  // Para que serve filtrar por faixa?
  //   Detectar se o sorteio ficou "concentrado" (muitos números num bloco só)
  //   ou "espalhado" (pelo menos 1~2 dezenas em cada bloco).
  //
  // Exemplo de uso:
  //   faixa1a5Min=1  → exige ao menos 1 dezena entre 1-5
  //   faixa1a5Max=3  → rejeita se 4 ou mais dezenas caírem entre 1-5
  
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
    description: 'Pagina atual da resposta paginada',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @ApiPropertyOptional({
    description: 'Quantidade de cartelas por pagina',
    example: 200,
    minimum: 1,
    maximum: 5000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5000)
  pageLimite?: number
}