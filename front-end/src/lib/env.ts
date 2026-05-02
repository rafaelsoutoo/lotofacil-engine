type ClientEnv = {
  NEXT_PUBLIC_API_BASE_URL: string
}

function getRequiredApiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!value) {
    throw new Error(
      'Variavel de ambiente obrigatoria ausente: NEXT_PUBLIC_API_BASE_URL',
    )
  }

  return value
}

function normalizeBaseUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.toString().replace(/\/$/, '')
  } catch {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL invalida. Exemplo esperado: http://localhost:3333/api',
    )
  }
}

export const env: ClientEnv = {
  NEXT_PUBLIC_API_BASE_URL: normalizeBaseUrl(
    getRequiredApiBaseUrl(),
  ),
}
