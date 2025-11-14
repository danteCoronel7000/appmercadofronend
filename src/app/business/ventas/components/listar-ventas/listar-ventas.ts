import { Component, inject } from '@angular/core';
import { VentaResponse } from '../../models/venta.model';
import { VentaService } from '../../services/venta.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-ventas',
  imports: [CommonModule],
  templateUrl: './listar-ventas.html',
  styleUrl: './listar-ventas.css'
})
export default class ListarVentas {
  listOrdenesVenta: VentaResponse[] = [];
  ventasService = inject(VentaService);
  ordenExpandida: number | null = null;
  mostrarModal = false;
  success = false;
  ordenSeleccionada: VentaResponse | null = null;

  constructor(private router: Router) {
    this.getListOrdenesVenta();
  }

  getListOrdenesVenta(): void {
    this.ventasService.obtenerOrdenesVenta().subscribe({
      next: (response) => {
        this.listOrdenesVenta = response;
        console.log("ordenes venta: ", response);
      }
    });
  }

  toggleDetalles(ordenId: number): void {
    this.ordenExpandida = this.ordenExpandida === ordenId ? null : ordenId;
  }

  cambiarEstado(orden: VentaResponse, id: number): void {
    this.ventasService.cambiarEstadoACompletada(id).subscribe({
      next: (res) => {
        orden.estado = res.estado;
        console.log('respuesta para completar venta', res);
        this.mostrarExito()
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/metricas']);
          }, 800);
      }
    });
  }

  abrirModalConfirmacion(orden: VentaResponse) {
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