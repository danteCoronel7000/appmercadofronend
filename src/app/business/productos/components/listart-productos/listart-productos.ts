import { Component, inject } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listart-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './listart-productos.html',
  styleUrl: './listart-productos.css'
})
export default class ListartProductos {
  listProductos: Producto[] = [] ;
  productosService = inject(ProductoService)

  constructor(private router: Router){
    this.getProductos();
  }

   getProductos(): void{
    this.productosService.getProductos().subscribe({
      next: (response) => {this.listProductos = response, console.log('lista de productos ', response)}
      }
    )
  }

  obtenerIdProducto(id: number):void{
    this.productosService.setIdProducto(id);
    this.router.navigate(['/editar-productos'])
  }

  protected getIdAndName(id: number, nombre: string){
    this.productosService.setIdProducto(id);
    this.productosService.setNameProducto(nombre);
  }

  buscarPorNombre(nombre: string): void {
    /*
    const value = nombre.trim();
    if (value) {
      this.productosService.buscarCategoria(value).subscribe({
        next: (categorias) => this.listCategorys = categorias,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getCategorys();
    }
      */
  }
}
