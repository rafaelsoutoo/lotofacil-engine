import { IsInt, IsPositive, IsDateString, IsArray, ArrayMinSize, ArrayMaxSize, Min, Max } from "class-validator";

export class CreateConcursoDTO {
    @IsInt()
    @IsPositive()
    numero: number;

    @IsDateString()
    data: string;

    @IsArray()
    @ArrayMinSize(15)
    @ArrayMaxSize(15)
    @IsInt({ each: true })
    @Min(1, { each: true })
    @Max(25, { each: true })
    dezenas: number[];

    @IsInt() soma: number;
    @IsInt() pares: number;
    @IsInt() impares: number;
    @IsInt() maiorSequencia: number;
    @IsInt() faixa1a5: number;
    @IsInt() faixa6a10: number;
    @IsInt() faixa11a15: number;
    @IsInt() faixa16a20: number;
    @IsInt() faixa21a25: number;
}