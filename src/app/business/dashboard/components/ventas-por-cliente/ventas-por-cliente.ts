import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexTitleSubtitle,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};


@Component({
  selector: 'app-ventas-por-cliente',
  imports: [ChartComponent],
  templateUrl: './ventas-por-cliente.html',
  styleUrl: './ventas-por-cliente.css'
})
export class VentasPorCliente {
   @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  ngOnInit() {
    // 🔹 Datos ficticios: top 5 clientes y sus montos totales
    const clientes = [
      'Juan Pérez',
      'Autopartes El Rápido',
      'Carlos Medina',
      'Taller Los Andes',
      'Ana Torres'
    ];
    const montos = [5000, 3500, 2700, 1800, 1500]; // Bs

    this.chartOptions = {
      series: montos,
      chart: {
        type: 'donut',
        height: 350
      },
      labels: clientes,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 280 },
            legend: { position: 'bottom' }
          }
        }
      ],
      legend: {
        position: 'bottom',
        labels: { colors: '#9CA3AF' }
      },
      title: {
        text: 'Top 5 Clientes por Ventas',
        align: 'center',
        style: { color: '#111827' }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number) => `${val.toLocaleString()} Bs`
        }
      }
    };
  }
}
