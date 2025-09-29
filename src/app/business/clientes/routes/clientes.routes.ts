import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../core/guards/are-you-logged-in-guard';

export const CLIENTES_ROUTES: Routes = [
    {
        path: 'nuevo-cliente',
        loadComponent: () => import('../components/new-cliente/new-cliente'),
        canActivate: [areYouLoggedInGuard]
    }
]