import {  IsNumber, IsString } from 'class-validator'

export class EnvVariables {

    @IsNumber()
    PORT: number = 3333

    @IsString()
    DATABASE_URL: string
}