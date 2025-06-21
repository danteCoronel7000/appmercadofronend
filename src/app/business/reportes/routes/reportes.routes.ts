import { Routes } from "@angular/router";

export const REPORTES_ROUTES: Routes = [
    {
        path: 'dashboard-reportes',
        loadComponent: () => import('../components/dasboard-reportes/dasboard-reportes')
    }
]