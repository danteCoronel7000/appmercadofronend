import { Component, inject } from '@angular/core';
import { OrdenCompraResponse } from '../../models/compras.model';
import { CommonModule } from '@angular/common';
import { ComprasService } from '../../services/compras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-compras',
  imports: [CommonModule],
  templateUrl: './listar-compras.html',
  styleUrl: './listar-compras.css'
})
export default class ListarCompras {
  listOrdenesCompra: OrdenCompraResponse[] = [];
  comprasService = inject(ComprasService);
  ordenExpandida: number | null = null;
  mostrarModal = false;
  success = false;
  ordenSeleccionada: OrdenCompraResponse | null = null;


  constructor(private router: Router){
    this.getListOrdenesCompra();
  }

  getListOrdenesCompra():void{
    this.comprasService.obtenerOrdenesCompra().subscribe({
      next:(response) => {this.listOrdenesCompra = response, console.log("ordenes compra: ",response)}
    })
  }

  toggleDetalles(ordenId: number): void {
    this.ordenExpandida = this.ordenExpandida === ordenId ? null : ordenId;
  }

  cambiarEstado(orden: OrdenCompraResponse, id: number): void {
    this.comprasService.cambiarEstadoACompletada(id).subscribe({
      next: (res) =>{ orden.estado = res.estado, 
        console.log('respuesta para completar',res)
        this.mostrarExito()
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/metricas']);
          }, 800);
      }
    })
    /*if (orden.estado === 'PENDIENTE') {
      orden.estado = 'COMPLETADA';
    }*/
  }

  abrirModalConfirmacion(orden: OrdenCompraResponse) {
    this.ordenSeleccionada = orden;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.ordenSeleccionada = null;
  }

  confirmarCompletarOrden() {
    if (this.ordenSeleccionada) {
      this.cambiarEstado(this.ordenSeleccionada, this.ordenSeleccionada.id);
      this.cerrarModal();
    }
  }

  getEstadoClass(estado: string): string {
    return estado === 'COMPLETADA' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  }

  mostrarExito(): void {
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 800); // 2.5 segundos visible
  }
}


/*
estos es la interfaz que recibira la lista de ordenes compra: export interface OrdenCompraResponse {

  id: number;

  numeroOrden: number;

  fechaOrden: string;

  total: number;

  estado: string;

  moneda: string;

  nroFactura: string | null;

  proveedorId: number;

  proveedorNombre: string;

  items: ItemCompraResponse[];

}

```typescript

// Interfaces para el response

export interface ItemCompraResponse {

  id: number;

  cantidad: number;

  precioUnitario: number;

  descuentoUnitario: number;

  subtotalDescuento: number;

  totalItem: number;

  productoId: number;

  productoNombre: string;

```

lo estoy realizando con angular quiero que me crees el html donde pueda listar las ordenesCompra  crea ordenes ficticias por el momento el componente.ts luego ya lo traeremos del backend por ahora solo con una listada de ordenes compra ficticias cada orden que contega un boton donde se le pueda cambiar el estado de RECIBIDO A COMPLETADO, quiero tambien que de cada orden de alguna manera se pueda ver los itemsCompra de cada orden, realiza el html con Tailwind css y obiamente que sea responsivo
*/