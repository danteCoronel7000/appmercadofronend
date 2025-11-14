import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexYAxis,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-rentabilidad-producto',
  imports: [NgApexchartsModule],
  templateUrl: './rentabilidad-producto.html',
  styleUrl: './rentabilidad-producto.css'
})
export class RentabilidadProducto {
   public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    // 🔹 Datos ficticios
    const productos = [
      'Filtro de aire',
      'Bujías NGK',
      'Aceite 10W40',
      'Pastillas de freno',
      'Batería Bosch',
      'Amortiguador Monroe',
      'Correa de distribución',
    ];

    // 🔹 Supuestos (en Bs)
    const precioVenta = [120, 80, 150, 90, 600, 250, 180];
    const costo = [70, 40, 100, 50, 450, 190, 120];
    const cantidadVendida = [30, 45, 20, 40, 15, 25, 35];

    // 🔹 Cálculos
    const totalVenta = precioVenta.map((p, i) => p * cantidadVendida[i]);
    const totalCosto = costo.map((c, i) => c * cantidadVendida[i]);
    const rentabilidad = totalVenta.map((t, i) => t - totalCosto[i]);

    this.chartOptions = {
      series: [
        { name: 'Costo Total', data: totalCosto },
        { name: 'Precio de Venta Total', data: totalVenta },
      ],
      chart: {
        type: 'bar',
        height: 380,
        stacked: true,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '70%',
          borderRadius: 5,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: productos,
        title: { text: 'Monto (Bs)' },
        labels: { style: { colors: '#6B7280' } },
      },
      yaxis: {
        labels: { style: { colors: '#374151' } },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => `Bs ${val.toFixed(2)}`,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      title: {
        text: 'Rentabilidad por Producto',
        align: 'center',
        style: { fontSize: '18px', fontWeight: '600', color: '#111827' },
      },
    };
  }
}
