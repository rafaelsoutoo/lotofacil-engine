import { IsInt, IsPositive, IsDateString, IsArray, ArrayMinSize, ArrayMaxSize, Min, Max, IsString, Length, Matches } from 'class-validator'

export class CreateConcursoDTO {
    @IsInt()
    @IsPositive()
    numero: number

    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'data deve estar no formato YYYY-MM-DD',
    })
    data: string

    @IsArray()
    @ArrayMinSize(15)
    @ArrayMaxSize(15)
    @IsInt({ each: true })
    @Min(1, { each: true })
    @Max(25, { each: true })
    dezenas: number[]

    @IsString()
    @Length(64, 64, { message: 'hash deve ter exatamente 64 caracteres (SHA-256)' })
    hash: string

    @IsInt() soma: number
    @IsInt() pares: number
    @IsInt() impares: number
    @IsInt() maiorSequencia: number
    @IsInt() faixa1a5: number
    @IsInt() faixa6a10: number
    @IsInt() faixa11a15: number
    @IsInt() faixa16a20: number
    @IsInt() faixa21a25: number
}