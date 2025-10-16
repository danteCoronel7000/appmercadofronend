import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../guards/are-you-logged-in-guard';

export const USUARIO_ROUTES: Routes = [
    {
        path: 'nuevo-usuario',
        loadComponent: () => import('../subcomponents/new-usuario/new-usuario'),
        canActivate: [areYouLoggedInGuard]
    },
    {
        path: 'listar-usuarios',
        loadComponent: () => import('../subcomponents/listar-usuarios/listar-usuarios'),
        canActivate: [areYouLoggedInGuard]
    },
    {
        path: 'add-user',
        loadComponent: () => import('../../../components/authentication/sing-up/sing-up'),
        canActivate: [areYouLoggedInGuard]
    }
]