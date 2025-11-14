import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexTooltip,
  ApexDataLabels,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-tasa-crecimiento',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './tasa-crecimiento.html',
  styleUrl: './tasa-crecimiento.css'
})
export class TasaCrecimiento {
  public chartOptions!: Partial<ChartOptions>;
  public tasaCrecimiento = 0;
  public tendenciaPositiva = true;

  ngOnInit(): void {
    // Datos ficticios de ventas mensuales
    const meses = ['Jul', 'Ago', 'Sep', 'Oct', 'Nov'];
    const ventas = [4800, 5200, 6100, 5800, 6400];

    // Calcular tasa de crecimiento del último mes vs anterior
    const actual = ventas[ventas.length - 1];
    const anterior = ventas[ventas.length - 2];
    this.tasaCrecimiento = ((actual - anterior) / anterior) * 100;
    this.tendenciaPositiva = this.tasaCrecimiento >= 0;

    // Configurar mini gráfico de línea
    this.chartOptions = {
      series: [{ name: 'Ventas', data: ventas }],
      chart: {
        type: 'line',
        height: 120,
        sparkline: { enabled: true },
      },
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      xaxis: { categories: meses },
      tooltip: {
        y: {
          formatter: (val: number) => `Bs ${val.toFixed(2)}`,
        },
      },
    };
  }

  getColor(): string {
    return this.tendenciaPositiva ? 'text-green-600' : 'text-red-600';
  }

  getIcon(): string {
    return this.tendenciaPositiva ? '↑' : '↓';
  }
}
