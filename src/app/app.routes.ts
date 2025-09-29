import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from './core/guards/are-you-logged-in-guard';
import { areYouHomeGuard } from './core/guards/are-you-home-guard';
import { CATEGORIAS_ROUTES } from './business/categorias/routes/categorias.routes';
import { PRODUCTOS_ROUTES } from './business/productos/routes/productos.routes';
import { PEDIDOS_ROUTES } from './business/pedidos/routes/pedidos.routes';
import { REPORTES_ROUTES } from './business/reportes/routes/reportes.routes';
import { DASHBOARD_ROUTES } from './business/dashboard/routes/dashboard.routes';
import { CLIENTES_ROUTES } from './business/clientes/routes/clientes.routes';

export const routes: Routes = [
     {
        path: '',
        redirectTo: 'metricas',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout'),
        children: [
          {
            path: 'metricas',
            loadComponent: () => import('./business/dashboard/components/metricas/metricas'),
            canActivate: [areYouLoggedInGuard]
          },
          {
            path: 'loading',
            loadComponent: () => import('./business/home/components/loading/loading'),
            canActivate: [areYouLoggedInGuard]
          },
          {
            path: 'lightweight',
            loadComponent: () => import('./business/dashboard/components/lightweight-charts/lightweight-charts'),
            canActivate: [areYouLoggedInGuard]
          },
          {
            path: 'carcards',
            loadComponent: () => import('./business/pedidos/components/cards/cards'),
            canActivate: [areYouLoggedInGuard]
          },
       
          ...CATEGORIAS_ROUTES,
          ...PRODUCTOS_ROUTES,
          ...PEDIDOS_ROUTES,
          ...REPORTES_ROUTES,
          ...DASHBOARD_ROUTES,
          ...CLIENTES_ROUTES
          
        ]
      },
      {
        path: 'sing-in',
        loadComponent: () => import('./core/components/authentication/sing-in/sing-in'),
        canActivate: [areYouHomeGuard]
      },
      {
        path: '**',
        redirectTo: 'metricas'
      }
];
