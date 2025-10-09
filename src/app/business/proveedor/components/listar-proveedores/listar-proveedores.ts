import { Component, inject } from '@angular/core';
import { Proveedor, ProveedorEmpDtoWeb, ProveedorPerDtoWeb } from '../../models/proveedor.model';
import { Router, RouterLink } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-proveedores',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-proveedores.html',
  styleUrl: './listar-proveedores.css'
})
export default class ListarProveedores {
  selectedTab: string = 'persona';
  listProveedoresPer: ProveedorPerDtoWeb[] = [];
  listProveedoresEmp: ProveedorEmpDtoWeb[] = [];
  proveedorEmpSelect?: ProveedorEmpDtoWeb;
  proveedorPerSelect?: ProveedorPerDtoWeb;
proveedorService = inject(ProveedorService);

// Variables de paginación
currentPagePer: number = 0;
pageSizePer: number = 12;
totalPagesPer: number = 0;
totalElementsPer: number = 0;
isFirstPer: boolean = true;
isLastPer: boolean = false;

// Variables de ordenamiento
sortPerBy: string = 'id';
sortPerDir: string = 'asc';

// Variables de paginación
currentPage: number = 0;
pageSize: number = 12;
totalPages: number = 0;
totalElements: number = 0;
isFirst: boolean = true;
isLast: boolean = false;

// Variables de ordenamiento
sortBy: string = 'id';
sortDir: string = 'asc';

// Variable para búsqueda
searchTerm: string = '';

constructor(private router: Router) {
  this.getProveedoresPersona(); // Puedes cambiar por getProveedoresEmpresa() según el caso
  this.getProveedoresEmpresa();
}

/* =======================
   MÉTODOS PRINCIPALES
======================= */

// Obtener proveedores tipo PERSONA
getProveedoresPersona(): void {
  this.proveedorService.getProveedoresPerPaginados(
    this.currentPagePer,
    this.pageSizePer,
    this.sortPerBy,
    this.sortPerDir
  ).subscribe({
    next: (response) => {
      this.listProveedoresPer = response.content;
      this.totalPagesPer = response.totalPages;
      this.totalElementsPer = response.totalElements;
      this.isFirstPer = response.first;
      this.isLastPer = response.last;
      console.log('Página de proveedores (persona):', response);
    },
    error: (err) => console.error('Error al obtener proveedores persona', err)
  });
}

// Obtener proveedores tipo EMPRESA
getProveedoresEmpresa(): void {
  this.proveedorService.getProveedoresEmpPaginados(
    this.currentPage,
    this.pageSize,
    this.sortBy,
    this.sortDir
  ).subscribe({
    next: (response) => {
      this.listProveedoresEmp = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.isFirst = response.first;
      this.isLast = response.last;
      console.log('Página de proveedores (empresa):', response);
    },
    error: (err) => console.error('Error al obtener proveedores empresa', err)
  });
}

/* =======================
   CONTROL DE PÁGINAS
======================= */
cambiarPagina(page: number, tipo: 'persona' | 'empresa'): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    tipo === 'persona' ? this.getProveedoresPersona() : this.getProveedoresEmpresa();
  }
}

cambiarPageSizePer(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    this.pageSizePer = parseInt(target.value);
    this.currentPagePer = 0;
    this.getProveedoresPersona();
  }
}

cambiarPageSizeEmp(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    this.pageSize = parseInt(target.value);
    this.currentPage = 0;
    this.getProveedoresEmpresa();
  }
}

/* =======================
   UTILIDADES
======================= */
obtenerIdProveedor(id: number): void {
  this.proveedorService.setIdProveedor(id);
  this.router.navigate(['/editar-proveedores']);
}

protected getIdAndName(id: number, nombre: string) {
  this.proveedorService.setIdProveedor(id);
  this.proveedorService.setNameProveedor(nombre);
}

 //verificar backen por que cambiamos para que reciba ProductoDTOForWeb
  buscarPorNombrePer(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.proveedorService.buscarProveedorPersona(value).subscribe({
        next: (response) => this.listProveedoresPer = response,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getProveedoresPersona();
    }
  } 
buscarPorNombreEmp(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.proveedorService.buscarProveedorEmpresa(value).subscribe({
        next: (response) => this.listProveedoresEmp = response,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getProveedoresEmpresa();
    }
  } 

  verDetallesEmp(proveedor: ProveedorEmpDtoWeb) {
    this.proveedorEmpSelect = proveedor;
  }

  verDetallesPer(proveedor: ProveedorPerDtoWeb) {
    this.proveedorPerSelect = proveedor;
  }

// Función trackBy para optimizar *ngFor
trackByFn(index: number, item: Proveedor): number {
  return item.id;
}

cerrarModal() {
  this.proveedorEmpSelect = undefined;
}

}
