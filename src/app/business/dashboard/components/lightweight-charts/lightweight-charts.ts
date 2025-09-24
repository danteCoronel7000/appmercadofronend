import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineSeries,
  LineData,
  UTCTimestamp,
} from 'lightweight-charts';
import { deflate } from 'zlib';

@Component({
  selector: 'app-lightweight-charts',
  imports: [],
  templateUrl: './lightweight-charts.html',
  styleUrl: './lightweight-charts.css'
})
export default class LightweightCharts implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  private chart!: IChartApi;
  private lineSeries?: ISeriesApi<'Line'>;

  ngAfterViewInit(): void {
    this.initChart();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.chart?.remove?.();
  }

  private initChart(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      rightPriceScale: { borderColor: '#ccc' },
      timeScale: { borderColor: '#ccc' },
    });

    this.lineSeries = this.chart.addSeries(LineSeries);

// Helper para convertir Date a UTCTimestamp
function toUTCTimestamp(date: Date): UTCTimestamp {
  // en la librería moderna, basta con Math.floor(date.getTime() / 1000) + cast
  return date.getTime() / 1000 as unknown as UTCTimestamp;
}

const data: LineData<UTCTimestamp>[] = [
  { time: toUTCTimestamp(new Date('2025-09-12')), value: 80 },
  { time: toUTCTimestamp(new Date('2025-09-13')), value: 82 },
  { time: toUTCTimestamp(new Date('2025-09-14')), value: 81 },
  { time: toUTCTimestamp(new Date('2025-09-15')), value: 83 },
  { time: toUTCTimestamp(new Date('2025-09-16')), value: 85 },
];

// Asignar al chart
this.lineSeries!.setData(data);

    // Ajusta la vista para que se vean los datos
    this.chart.timeScale().fitContent();
  }

  private onResize = (): void => {
    if (this.chart) {
      const width = this.chartContainer.nativeElement.clientWidth;
      this.chart.resize(width, 400);
    }
  };
}