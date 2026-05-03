export const ROUTES = {
  HOME: '/',
  ESTATISTICAS: '/estatisticas',
} as const

export type AppRouteKey = keyof typeof ROUTES
export type AppRoutePath = (typeof ROUTES)[AppRouteKey]

type RouteMeta = {
  path: AppRoutePath
  title: string
  requiresAuth: boolean
}

export const ROUTE_META: Record<AppRouteKey, RouteMeta> = {
  HOME: {
    path: ROUTES.HOME,
    title: 'Análise',
    requiresAuth: false,
  },
  ESTATISTICAS: {
    path: ROUTES.ESTATISTICAS,
    title: 'Estatísticas',
    requiresAuth: false,
  },
}

export function getRouteByKey(routeKey: AppRouteKey): AppRoutePath {
  return ROUTES[routeKey]
}
