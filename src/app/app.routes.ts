import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from './core/guards/are-you-logged-in-guard';
import { areYouHomeGuard } from './core/guards/are-you-home-guard';

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
          {
            path: 'listar-productos',
            loadComponent: () => import('./business/productos/components/listart-productos/listart-productos'),
            canActivate: [areYouLoggedInGuard]
          },
          {
            path: 'listar-categorias',
            loadComponent: () => import('./business/categorias/components/categorias-list/categorias-list'),
            canActivate: [areYouLoggedInGuard]
          },
          {
            path: 'nueva-categoria',
            loadComponent: () => import('./business/categorias/components/new-categoria/new-categoria'),
            canActivate: [areYouLoggedInGuard]
          },
          {
            path: 'editar-categoria',
            loadComponent: () => import('./business/categorias/components/editar-categoria/editar-categoria')
          },
          {
            path: 'delete-categoria',
            loadComponent: () => import('./business/categorias/components/delete-categoria/delete-categoria')
          }
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
