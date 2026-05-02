import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

export function ApiFiltroQueries() {
  return applyDecorators(
    ApiQuery({ name: 'somaMin', required: false, type: Number, example: 140, description: 'Soma minima da combinacao' }),
    ApiQuery({ name: 'somaMax', required: false, type: Number, example: 230, description: 'Soma maxima da combinacao' }),
    ApiQuery({
      name: 'maiorSequenciaMin',
      required: false,
      type: Number,
      example: 1,
      description: 'Menor sequencia permitida',
    }),
    ApiQuery({
      name: 'maiorSequenciaMax',
      required: false,
      type: Number,
      example: 6,
      description: 'Maior sequencia permitida',
    }),
    ApiQuery({ name: 'paresMin', required: false, type: Number, example: 5, description: 'Quantidade minima de pares' }),
    ApiQuery({ name: 'paresMax', required: false, type: Number, example: 10, description: 'Quantidade maxima de pares' }),
    ApiQuery({ name: 'faixa1a5Min', required: false, type: Number, example: 1, description: 'Minimo na faixa 1 a 5' }),
    ApiQuery({ name: 'faixa1a5Max', required: false, type: Number, example: 4, description: 'Maximo na faixa 1 a 5' }),
    ApiQuery({
      name: 'faixa6a10Min',
      required: false,
      type: Number,
      example: 1,
      description: 'Minimo na faixa 6 a 10',
    }),
    ApiQuery({
      name: 'faixa6a10Max',
      required: false,
      type: Number,
      example: 4,
      description: 'Maximo na faixa 6 a 10',
    }),
    ApiQuery({
      name: 'faixa11a15Min',
      required: false,
      type: Number,
      example: 1,
      description: 'Minimo na faixa 11 a 15',
    }),
    ApiQuery({
      name: 'faixa11a15Max',
      required: false,
      type: Number,
      example: 4,
      description: 'Maximo na faixa 11 a 15',
    }),
    ApiQuery({
      name: 'faixa16a20Min',
      required: false,
      type: Number,
      example: 1,
      description: 'Minimo na faixa 16 a 20',
    }),
    ApiQuery({
      name: 'faixa16a20Max',
      required: false,
      type: Number,
      example: 4,
      description: 'Maximo na faixa 16 a 20',
    }),
    ApiQuery({
      name: 'faixa21a25Min',
      required: false,
      type: Number,
      example: 1,
      description: 'Minimo na faixa 21 a 25',
    }),
    ApiQuery({
      name: 'faixa21a25Max',
      required: false,
      type: Number,
      example: 4,
      description: 'Maximo na faixa 21 a 25',
    }),
    ApiQuery({
      name: 'limiteRetorno',
      required: false,
      type: Number,
      example: 200,
      description: 'Limite de cartelas retornadas (1 ate 5000)',
    }),
  )
}
