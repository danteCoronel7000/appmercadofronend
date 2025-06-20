import { Routes } from "@angular/router";
import { areYouLoggedInGuard } from "../../../core/guards/are-you-logged-in-guard";

export const CATEGORIAS_ROUTES: Routes = [
      {
    path: 'listar-categorias',
    loadComponent: () => import('../components/categorias-list/categorias-list'),
    canActivate: [areYouLoggedInGuard]
  },
  {
    path: 'nueva-categoria',
    loadComponent: () => import('../components/new-categoria/new-categoria'),
    canActivate: [areYouLoggedInGuard]
  },
  {
    path: 'editar-categoria',
    loadComponent: () => import('../components/editar-categoria/editar-categoria')
  },
  {
    path: 'delete-categoria',
    loadComponent: () => import('../components/delete-categoria/delete-categoria')
  }
]