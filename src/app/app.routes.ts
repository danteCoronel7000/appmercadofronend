import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from './core/guards/are-you-logged-in-guard';
import { areYouHomeGuard } from './core/guards/are-you-home-guard';
import { CATEGORIAS_ROUTES } from './business/categorias/routes/categorias.routes';
import { PRODUCTOS_ROUTES } from './business/productos/routes/productos.routes';

export const routes: Routes = [
     {
        path: '',
        redirectTo: 'loading',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout'),
        children: [
          {
            path: 'loading',
            loadComponent: () => import('./business/home/components/loading/loading'),
            canActivate: [areYouLoggedInGuard]
          },
       
          ...CATEGORIAS_ROUTES,
          ...PRODUCTOS_ROUTES
        ]
      },
      {
        path: 'sing-in',
        loadComponent: () => import('./core/components/authentication/sing-in/sing-in'),
        canActivate: [areYouHomeGuard]
      },
      {
        path: '**',
        redirectTo: 'loading'
      }
];
