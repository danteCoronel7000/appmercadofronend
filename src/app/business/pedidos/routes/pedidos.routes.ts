import { Routes } from "@angular/router";
import { areYouLoggedInGuard } from "../../../core/guards/are-you-logged-in-guard";

export const PEDIDOS_ROUTES: Routes = [
    {
        path: 'listar-pedidos',
        loadComponent: () => import('../components/listar-pedidos/listar-pedidos'),
        canActivate: [areYouLoggedInGuard]
    }
]