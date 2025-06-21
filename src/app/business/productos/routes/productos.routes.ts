import { Routes } from "@angular/router";
import { areYouLoggedInGuard } from "../../../core/guards/are-you-logged-in-guard";

export const PRODUCTOS_ROUTES: Routes = [
    {
        path: 'nuevo-producto',
        loadComponent: () => import('../components/new-producto/new-producto'),
        canActivate: [areYouLoggedInGuard]
    },
    {
        path: 'listar-productos',
        loadComponent: () => import('../components/listart-productos/listart-productos'),
        canActivate: [areYouLoggedInGuard]
    },
    {
        path: 'editar-productos',
        loadComponent: () => import('../components/editar-producto/editar-producto')
    },
    {
        path: 'delete-producto',
        loadComponent: () => import('../components/delete-prdoducto/delete-prdoducto')
    }
]