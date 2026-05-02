export const ROUTES = {
  HOME: '/',
  FILTROS: '/filtros',
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
    title: 'Início',
    requiresAuth: false,
  },
  FILTROS: {
    path: ROUTES.FILTROS,
    title: 'Filtros',
    requiresAuth: false,
  },
}

export function getRouteByKey(routeKey: AppRouteKey): AppRoutePath {
  return ROUTES[routeKey]
}
