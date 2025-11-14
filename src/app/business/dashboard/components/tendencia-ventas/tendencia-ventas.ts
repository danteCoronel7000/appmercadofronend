import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexTitleSubtitle, ApexMarkers, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
};

@Component({
  selector: 'app-tendencia-ventas',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './tendencia-ventas.html',
})
export class TendenciaVentasComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    // Datos ficticios (mes -> monto_total)
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const ventasMensuales = [4500, 5200, 6100, 4800, 6700, 7200];

    this.chartOptions = {
      series: [
        {
          name: 'Total de Ventas (Bs)',
          data: ventasMensuales,
        },
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#1E3A8A'], // azul oscuro
        },
      },
      markers: {
        size: 5,
        colors: ['#1E40AF'],
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      xaxis: {
        categories: meses,
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '13px',
          },
        },
      },
      title: {
        text: 'Tendencia de Ventas Mensuales',
        align: 'center',
        style: {
          fontSize: '18px',
          color: '#111827',
          fontWeight: '600',
        },
      },
    };
  }
}


@Component({
  selector: 'app-tendencia-ventas',
  imports: [NgApexchartsModule],
  templateUrl: './tendencia-ventas.html',
  styleUrl: './tendencia-ventas.css'
})
export class TendenciaVentas {
   public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    // Datos ficticios (mes -> monto_total)
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const ventasMensuales = [4500, 5200, 6100, 4800, 6700, 7200];

    this.chartOptions = {
      series: [
        {
          name: 'Total de Ventas (Bs)',
          data: ventasMensuales,
        },
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#1E3A8A'], // azul oscuro
        },
      },
      markers: {
        size: 5,
        colors: ['#1E40AF'],
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      xaxis: {
        categories: meses,
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '13px',
          },
        },
      },
      title: {
        text: 'Tendencia de Ventas Mensuales',
        align: 'center',
        style: {
          fontSize: '18px',
          color: '#111827',
          fontWeight: '600',
        },
      },
    };
  }
}
