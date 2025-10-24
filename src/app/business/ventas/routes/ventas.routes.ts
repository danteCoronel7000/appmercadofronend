import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../core/guards/are-you-logged-in-guard';

export const VENTAS_ROUTES: Routes = [
      {
    path: 'listar-ventas',
    loadComponent: () => import('../components/listar-ventas/listar-ventas'),
    canActivate: [areYouLoggedInGuard]
  },
  {
    path: 'registrar-venta',
    loadComponent: () => import('../components/registrar-venta/registrar-venta'),
    canActivate: [areYouLoggedInGuard]
  }
]