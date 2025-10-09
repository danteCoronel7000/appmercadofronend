import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cliente, ClienteDTOForWeb } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.css'
})
export default class ListarClientes {
  listClientes: ClienteDTOForWeb[] = [];
  clienteSeleccionado?: ClienteDTOForWeb;
  clienteService = inject(ClienteService);

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
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientesPaginados(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDir
    ).subscribe({
      next: (response) => {
        this.listClientes = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isFirst = response.first;
        this.isLast = response.last;
        console.log('Página recibida:', response);
      },
      error: (err) => console.error('Error al obtener clientes', err)
    });
  }

  cambiarPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getClientes();
    }
  }

  cambiarPageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.pageSize = parseInt(target.value);
      this.currentPage = 0;
      this.getClientes();
    }
  }

  obtenerIdCliente(id: number): void {
    this.clienteService.setIdCliente(id);
    this.router.navigate(['/editar-clientes']);
  }

  protected getIdAndName(id: number, nombre: string) {
    this.clienteService.setIdCliente(id);
    this.clienteService.setNameCliente(nombre);
  }

  //verificar backend por que cambiamos para que reciba ClienteDTOForWeb
  buscarPorNombre(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.clienteService.buscarCliente(value).subscribe({
        next: (clientes) => this.listClientes = clientes,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getClientes();
    }
  }

  verDetalles(cliente: ClienteDTOForWeb) {
    this.clienteSeleccionado = cliente;
  }

  cerrarModal() {
    this.clienteSeleccionado = undefined;
  }

  // Función trackBy para optimizar el rendimiento de *ngFor
  trackByFn(index: number, item: Cliente): number {
    return item.id;
  }

}
