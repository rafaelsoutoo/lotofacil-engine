import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvVariables } from './env.dto'

const envVariables = plainToInstance(EnvVariables, process.env, {
  enableImplicitConversion: true,
})

const errors = validateSync(envVariables, {
  skipMissingProperties: false,
})

if (errors.length > 0) {
  console.error('❌ Variáveis de ambiente inválidas:')
  errors.forEach((e) => {
    console.error(`   ${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`)
  })
  throw new Error('Invalid environment variables')
}

export const env = envVariables