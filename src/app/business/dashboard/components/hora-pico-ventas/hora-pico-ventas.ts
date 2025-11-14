import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexPlotOptions,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-hora-pico-ventas',
  imports: [NgApexchartsModule],
  templateUrl: './hora-pico-ventas.html',
  styleUrl: './hora-pico-ventas.css'
})
export class HoraPicoVentas {
   public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    // 🕐 Datos ficticios: cantidad de ventas por hora (0 - 23)
    const horas = [
      '00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h',
      '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h',
      '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'
    ];

    // Cantidad de ventas simuladas por hora
    const ventasPorHora = [
      2, 1, 0, 0, 1, 3, 5, 10, 18, 25, 30, 27,
      35, 38, 40, 32, 28, 22, 18, 12, 7, 5, 3, 1
    ];

    this.chartOptions = {
      series: [
        {
          name: 'Ventas registradas',
          data: ventasPorHora,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: horas,
        title: { text: 'Hora del día' },
        labels: { rotate: -45 },
      },
      yaxis: {
        title: { text: 'Número de Ventas' },
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} ventas`,
        },
      },
      title: {
        text: 'Horas Pico de Ventas',
        align: 'center',
        style: { fontSize: '18px', fontWeight: '600', color: '#111827' },
      },
    };
  }
}
