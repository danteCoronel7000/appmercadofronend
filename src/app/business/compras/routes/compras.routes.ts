import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../core/guards/are-you-logged-in-guard';

export const COMPRAS_ROUTES: Routes = [
      {
    path: 'listar-compras',
    loadComponent: () => import('../components/listar-compras/listar-compras'),
    canActivate: [areYouLoggedInGuard]
  },
  {
    path: 'registrar-compra',
    loadComponent: () => import('../components/registrar-compra/registrar-compra'),
    canActivate: [areYouLoggedInGuard]
  }
]