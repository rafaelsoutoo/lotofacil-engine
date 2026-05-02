import { IsInt, IsString, Length } from 'class-validator'

export class EnvVariables {
    
    @IsInt()
    @Length(4)
    PORT: number

    @IsString()
    DATABASE_URL: string
}