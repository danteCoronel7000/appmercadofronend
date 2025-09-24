import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../core/guards/are-you-logged-in-guard';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: 'metricas',
        loadComponent: () => import('../components/metricas/metricas'),
        canActivate: [areYouLoggedInGuard]
    }
]