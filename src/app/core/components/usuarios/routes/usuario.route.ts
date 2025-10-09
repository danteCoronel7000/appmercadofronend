import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../guards/are-you-logged-in-guard';

export const USUARIO_ROUTES: Routes = [
    {
        path: 'nuevo-usuario',
        loadComponent: () => import('../subcomponents/new-usuario/new-usuario'),
        canActivate: [areYouLoggedInGuard]
    }
]