import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: { name: string; data: number[] }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-producto-mas-vendido',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './producto-mas-vendido.html',
  styleUrl: './producto-mas-vendido.css'
})
export class ProductoMasVendido {
   @ViewChild('chart') chart!: ChartComponent;
     public chartOptions!: ChartOptions;
   
     ngOnInit() {
       const productos = ['orrin', 'filtro de aire', 'bujia NGK', 'Pastilllas de freno', 'Correa de distribución'];
       const ventas = [10, 15, 7, 12, 5]; // Datos ficticios
   
       this.chartOptions = {
         series: [
           {
             name: 'Ventas',
             data: ventas
           }
         ],
         chart: {
           type: 'bar',
           height: 350,
           toolbar: { show: false }
         },
         plotOptions: {
           bar: {
             borderRadius: 8,
             columnWidth: '45%',
             distributed: true
           }
         },
         dataLabels: {
           enabled: true,
           style: {
             colors: ['#fff']
           }
         },
         xaxis: {
           categories: productos,
           labels: {
             style: {
               colors: '#374151',
               fontSize: '14px'
             }
           }
         },
         yaxis: {
           title: { text: 'Cantidad de Ventas' }
         },
         fill: { opacity: 0.9 },
         tooltip: { theme: 'dark' },
         legend: { show: false },
         stroke: { show: true, width: 2, colors: ['transparent'] },
         grid: { borderColor: '#e5e7eb' },
         title: { text: 'Ventas por producto', align: 'center' }
       };
     }
}
