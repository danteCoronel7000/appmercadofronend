import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { VentaService } from '../../../ventas/services/venta.service';
import { VentasService } from '../../services/ventas.service';
import { Ventas } from '../../models/ventas.model';
import { VentaSocketService } from '../../services/venta-socket.service';

@Component({
  selector: 'app-ventas-dash',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './ventas-dash.html',
  styleUrl: './ventas-dash.css'
})
export class VentasDash {
  ventasList: Ventas[] = [];

  ventasService = inject(VentasService);
  ventaSocketService = inject(VentaSocketService);

  totalVentas = 0;
  numeroVentas = 0;
  ingresoPromedio = 0;

  constructor() {
    this.getVentas();
    this.getNewVentaByWebSocket();
  }

  // Verificar backend por que cambiamos para que reciba Ventas
getNewVentaByWebSocket(): void {
  this.ventaSocketService.ventaActualizada$.subscribe(venta => {
    const index = this.ventasList.findIndex(v => v.id === venta.id);
    if (index !== -1) {
      this.ventasList[index] = venta;
    } else {
      this.ventasList.push(venta);
    }
    this.calcularMetricas();
    console.log("venta nueva: ", venta)
  });
}


  getVentas(): void{
    this.ventasService.getVentas().subscribe({
      next:(response) =>{this.ventasList = response
        console.log("ventas con monto",this.ventasList)
        this.calcularMetricas();
      }
    })
  }

  calcularMetricas() {
    this.numeroVentas = this.ventasList.length;
    this.totalVentas = this.ventasList
      .reduce((acc, venta) => acc + venta.montoTotal, 0);
    this.ingresoPromedio = this.totalVentas / this.numeroVentas;
  }
   chartOptions = {
    series: [
      { name: 'Ventas', data: [10, 41, 35, 51, 49, 62, 69] }
    ] as ApexAxisChartSeries,
    chart: {
      type: 'line',
      height: 350
    } as ApexChart,
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']
    } as ApexXAxis,
    title: {
      text: 'Ventas Mensuales'
    } as ApexTitleSubtitle
  };
}
