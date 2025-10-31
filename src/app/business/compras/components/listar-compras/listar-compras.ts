import { Component, inject } from '@angular/core';
import { OrdenCompraResponse } from '../../models/compras.model';
import { CommonModule } from '@angular/common';
import { ComprasService } from '../../services/compras.service';

@Component({
  selector: 'app-listar-compras',
  imports: [CommonModule],
  templateUrl: './listar-compras.html',
  styleUrl: './listar-compras.css'
})
export default class ListarCompras {
  listOrdenesCompra: OrdenCompraResponse[] = [
    {
      id: 1,
      numeroOrden: 1001,
      fechaOrden: '2025-10-15',
      total: 2450.00,
      estado: 'RECIBIDO',
      moneda: 'BOB',
      nroFactura: 'F-2025-001',
      proveedorId: 1,
      proveedorNombre: 'Distribuidora La Paz S.A.',
      items: [
        {
          id: 1,
          cantidad: 10,
          precioUnitario: 150.00,
          descuentoUnitario: 5.00,
          subtotalDescuento: 50.00,
          totalItem: 1450.00,
          productoId: 101,
          productoNombre: 'Laptop HP 15"'
        },
        {
          id: 2,
          cantidad: 5,
          precioUnitario: 200.00,
          descuentoUnitario: 0.00,
          subtotalDescuento: 0.00,
          totalItem: 1000.00,
          productoId: 102,
          productoNombre: 'Monitor Dell 24"'
        }
      ]
    },
    {
      id: 2,
      numeroOrden: 1002,
      fechaOrden: '2025-10-20',
      total: 3200.00,
      estado: 'RECIBIDO',
      moneda: 'BOB',
      nroFactura: null,
      proveedorId: 2,
      proveedorNombre: 'Tecnología Andina Ltda.',
      items: [
        {
          id: 3,
          cantidad: 20,
          precioUnitario: 80.00,
          descuentoUnitario: 10.00,
          subtotalDescuento: 200.00,
          totalItem: 1400.00,
          productoId: 103,
          productoNombre: 'Teclado Mecánico'
        },
        {
          id: 4,
          cantidad: 15,
          precioUnitario: 120.00,
          descuentoUnitario: 0.00,
          subtotalDescuento: 0.00,
          totalItem: 1800.00,
          productoId: 104,
          productoNombre: 'Mouse Inalámbrico'
        }
      ]
    },
    {
      id: 3,
      numeroOrden: 1003,
      fechaOrden: '2025-10-25',
      total: 5600.00,
      estado: 'COMPLETADO',
      moneda: 'BOB',
      nroFactura: 'F-2025-002',
      proveedorId: 3,
      proveedorNombre: 'Importadora Bolivia',
      items: [
        {
          id: 5,
          cantidad: 8,
          precioUnitario: 700.00,
          descuentoUnitario: 50.00,
          subtotalDescuento: 400.00,
          totalItem: 5200.00,
          productoId: 105,
          productoNombre: 'Impresora Multifuncional'
        },
        {
          id: 6,
          cantidad: 10,
          precioUnitario: 40.00,
          descuentoUnitario: 0.00,
          subtotalDescuento: 0.00,
          totalItem: 400.00,
          productoId: 106,
          productoNombre: 'Cable HDMI 2m'
        }
      ]
    },
    {
      id: 4,
      numeroOrden: 1004,
      fechaOrden: '2025-10-28',
      total: 1850.00,
      estado: 'RECIBIDO',
      moneda: 'BOB',
      nroFactura: 'F-2025-003',
      proveedorId: 1,
      proveedorNombre: 'Distribuidora La Paz S.A.',
      items: [
        {
          id: 7,
          cantidad: 25,
          precioUnitario: 50.00,
          descuentoUnitario: 2.00,
          subtotalDescuento: 50.00,
          totalItem: 1200.00,
          productoId: 107,
          productoNombre: 'Memoria USB 32GB'
        },
        {
          id: 8,
          cantidad: 10,
          precioUnitario: 65.00,
          descuentoUnitario: 0.00,
          subtotalDescuento: 0.00,
          totalItem: 650.00,
          productoId: 108,
          productoNombre: 'Disco Duro Externo 1TB'
        }
      ]
    }
  ];
  comprasService = inject(ComprasService);
  ordenExpandida: number | null = null;

  constructor(){
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

  cambiarEstado(orden: OrdenCompraResponse): void {
    if (orden.estado === 'PENDIENTE') {
      orden.estado = 'COMPLETADA';
    }
  }

  getEstadoClass(estado: string): string {
    return estado === 'COMPLETADA' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
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