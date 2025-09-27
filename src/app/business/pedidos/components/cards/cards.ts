import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { ProductoDTOForWeb } from '../../../productos/models/producto.model';
import { ProductoService } from '../../../productos/services/producto.service';
@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export default class Cards {
 listProductos: ProductoDTOForWeb [] = [];
   // Variables de paginación
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  isFirst: boolean = true;
  isLast: boolean = false;

  // Variables de ordenamiento
  sortBy: string = 'nombre';
  sortDir: string = 'asc';

  // Variable para búsqueda
  searchTerm: string = '';
  productoService = inject(ProductoService)

 constructor(){
  this.getProductos();
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
  onCardAction(action: string, product: ProductoDTOForWeb) {
    console.log(`Action: ${action} on car:`, product.nombre);
    // Aquí puedes implementar las acciones específicas
  }
}
