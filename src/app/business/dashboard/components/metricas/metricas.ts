import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-metricas',
  imports: [CommonModule],
  templateUrl: './metricas.html',
  styleUrl: './metricas.css'
})
export default class Metricas {
    public canvas: HTMLCanvasElement | null = null;
    public ctx: CanvasRenderingContext2D | null = null;
    public datasets: number[][] = [];
    public data: number[] = [];
    public myChartData: Chart<'line', number[], string> | null = null;
    public clicked: boolean = true;
    public clicked1: boolean = false;
    public clicked2: boolean = false;
  
    constructor() {}
  
    ngOnInit(): void {
      this.initializeCharts();
    }
  
    private initializeCharts(): void {
      // Configuración de opciones reutilizables
      const gradientChartOptionsConfigurationWithTooltipRed: ChartOptions<'line'> = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#f5f5f5',
            titleColor: '#333',
            bodyColor: '#666',
            bodySpacing: 4,
            padding: 12,
            mode: 'nearest',
            intersect: false,
            position: 'nearest'
          }
        },
        responsive: true,
        scales: {
          y: {
            min: 60,
            max: 125,
            grid: {
              display: true,
              color: 'rgba(29,140,248,0.0)',
              lineWidth: 0
            },
            ticks: {
              padding: 20,
              color: '#9a9a9a'
            },
            border: {
              display: false
            }
          },
          x: {
            grid: {
              display: true,
              color: 'rgba(233,32,16,0.1)',
              lineWidth: 0
            },
            ticks: {
              padding: 20,
              color: '#9a9a9a'
            },
            border: {
              display: false
            }
          }
        }
      };
  
      const gradientChartOptionsConfigurationWithTooltipGreen: ChartOptions<'line'> = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#f5f5f5',
            titleColor: '#333',
            bodyColor: '#666',
            bodySpacing: 4,
            padding: 12,
            mode: 'nearest',
            intersect: false,
            position: 'nearest'
          }
        },
        responsive: true,
        scales: {
          y: {
            min: 50,
            max: 125,
            grid: {
              display: true,
              color: 'rgba(29,140,248,0.0)',
              lineWidth: 0
            },
            ticks: {
              padding: 20,
              color: '#9e9e9e'
            },
            border: {
              display: false
            }
          },
          x: {
            grid: {
              display: true,
              color: 'rgba(0,242,195,0.1)',
              lineWidth: 0
            },
            ticks: {
              padding: 20,
              color: '#9e9e9e'
            },
            border: {
              display: false
            }
          }
        }
      };
  
      // Primer gráfico - Línea Roja
      this.createRedLineChart(gradientChartOptionsConfigurationWithTooltipRed);
  
      // Segundo gráfico - Línea Verde
      this.createGreenLineChart(gradientChartOptionsConfigurationWithTooltipGreen);
  
      // Tercer gráfico - Gráfico principal
      this.createMainChart(gradientChartOptionsConfigurationWithTooltipRed);
  
      // Cuarto gráfico - Country Chart (incompleto en el original)
      this.createCountryChart();
    }
  
    private createRedLineChart(options: ChartOptions<'line'>): void {
      this.canvas = document.getElementById('chartLineRed') as HTMLCanvasElement;
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;
  
      const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)');
  
      const config: ChartConfiguration<'line', number[], string> = {
        type: 'line',
        data: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [{
            label: 'Data',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [80, 100, 70, 80, 120, 80],
          }]
        },
        options: options
      };
  
      new Chart(this.ctx, config);
    }
  
    private createGreenLineChart(options: ChartOptions<'line'>): void {
      this.canvas = document.getElementById('chartLineGreen') as HTMLCanvasElement;
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;
  
      const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)');
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)');
  
      const config: ChartConfiguration<'line', number[], string> = {
        type: 'line',
        data: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
          datasets: [{
            label: 'My First dataset',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#00d6b4',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#00d6b4',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#00d6b4',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [90, 27, 60, 12, 80],
          }]
        },
        options: options
      };
  
      new Chart(this.ctx, config);
    }
  
    private createMainChart(options: ChartOptions<'line'>): void {
      const chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      this.datasets = [
        [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
      ];
      this.data = this.datasets[0];
  
      this.canvas = document.getElementById('chartBig1') as HTMLCanvasElement;
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;
  
      const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)');
  
      const config: ChartConfiguration<'line', number[], string> = {
        type: 'line',
        data: {
          labels: chart_labels,
          datasets: [{
            label: 'My First dataset',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }]
        },
        options: options
      };
  
      this.myChartData = new Chart(this.ctx, config);
    }
  
    private createCountryChart(): void {
      this.canvas = document.getElementById('CountryChart') as HTMLCanvasElement;
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;
  
      const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)');
  
      // Aquí puedes agregar la configuración completa del CountryChart
      // El código original estaba incompleto
    }
  
    public updateOptions(): void {
      if (this.myChartData && this.myChartData.data.datasets[0]) {
        // No recrear el chart, solo actualizar los datos
        this.myChartData.data.datasets[0].data = this.data;
        this.myChartData.update('none'); // 'none' evita animaciones que pueden causar crecimiento
      }
    }
  
    // Método para limpiar al destruir el componente
    ngOnDestroy(): void {
      if (this.myChartData) {
        this.myChartData.destroy();
        this.myChartData = null;
      }
    }
  
    // Métodos adicionales para cambiar datasets (opcional)
    public changeDataset(index: number): void {
      if (index >= 0 && index < this.datasets.length) {
        this.data = this.datasets[index];
        this.updateOptions();
      }
    }
}
