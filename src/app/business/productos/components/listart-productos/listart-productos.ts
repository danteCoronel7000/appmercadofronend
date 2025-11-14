import { Component, inject } from '@angular/core';
import { Producto, ProductoDTOForWeb } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoSocketService } from '../../services/producto-socket.service';

@Component({
  selector: 'app-listart-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './listart-productos.html',
  styleUrl: './listart-productos.css'
})
export default class ListartProductos {
  listProductos: ProductoDTOForWeb[] = [];
  productoSeleccionado?: ProductoDTOForWeb;
  productoService = inject(ProductoService);
  productoSocketService = inject(ProductoSocketService);

  // Variables de paginación
  currentPage: number = 0;
  pageSize: number = 12;
  totalPages: number = 0;
  totalElements: number = 0;
  isFirst: boolean = true;
  isLast: boolean = false;

  // Variables de ordenamiento
  sortBy: string = 'nombre';
  sortDir: string = 'asc';

  // Variable para búsqueda
  searchTerm: string = '';

  constructor(private router: Router) {
    this.getProductos();
    this.getNewProductByWebSocket();
  }

  //verificar backen por que cambiamos para que reciba ProductoDTOForWeb
  getNewProductByWebSocket(): void {
    this.productoSocketService.productoActualizado$.subscribe(producto => {
      const index = this.listProductos.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.listProductos[index] = producto;
      } else {
        this.listProductos.push(producto);
        this.totalElements += 1;
      }
    });
  }

  getProductos(): void {
    this.productoService.getProductosPaginados(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDir
    ).subscribe({
      next: (response) => {
        this.listProductos = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isFirst = response.first;
        this.isLast = response.last;
        console.log('Página recibida:', response);
      },
      error: (err) => console.error('Error al obtener productos', err)
    });
  }

  cambiarPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getProductos();
    }
  }

 cambiarPageSize(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    this.pageSize = parseInt(target.value);
    this.currentPage = 0;
    this.getProductos();
  }
}

  obtenerIdProducto(id: number): void {
    this.productoService.setIdProducto(id);
    this.router.navigate(['/editar-productos']);
  }

  protected getIdAndName(id: number, nombre: string) {
    this.productoService.setIdProducto(id);
    this.productoService.setNameProducto(nombre);
  }

  //verificar backen por que cambiamos para que reciba ProductoDTOForWeb
  buscarPorNombre(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.productoService.buscarProducto(value).subscribe({
        next: (producto) => this.listProductos = producto,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getProductos();
    }
  }   
  

verDetalles(producto: ProductoDTOForWeb) {
  this.productoSeleccionado = producto;
}

cerrarModal() {
  this.productoSeleccionado = undefined;
}

  // Función trackBy para optimizar el rendimiento de *ngFor
  trackByFn(index: number, item: Producto): number {
    return item.id;
  }
}
