import { IsInt, IsOptional, Min, Max } from 'class-validator'

export class FiltroConcursoDTO {
  // ── Soma ──────────────────────────────────────────────────────────────────
  @IsOptional()
  @IsInt()
  @Min(15)
  somaMin?: number

  @IsOptional()
  @IsInt()
  @Max(375)
  somaMax?: number

  // ── Sequência ─────────────────────────────────────────────────────────────
  // ex: maiorSequenciaMax=6 descarta combinações com sequência >= 7
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  maiorSequenciaMin?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  maiorSequenciaMax?: number

  // ── Paridade ──────────────────────────────────────────────────────────────
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  paresMin?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  paresMax?: number

  // ── Faixas ────────────────────────────────────────────────────────────────
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa1a5Min?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa1a5Max?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa6a10Min?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa6a10Max?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa11a15Min?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa11a15Max?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa16a20Min?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa16a20Max?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa21a25Min?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(15)
  faixa21a25Max?: number
}