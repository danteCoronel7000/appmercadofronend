import { Routes } from '@angular/router';
import { areYouLoggedInGuard } from '../../../core/guards/are-you-logged-in-guard';

export const PROVEEDOR_ROUTES: Routes = [
    {
        path: 'nuevo-proveedor',
        loadComponent: () => import('../components/new-proveedor/new-proveedor'),
        canActivate: [areYouLoggedInGuard]
    },
    {
        path: 'listar-proveedores',
        loadComponent: () => import('../components/listar-proveedores/listar-proveedores'),
        canActivate: [areYouLoggedInGuard]
    }
]