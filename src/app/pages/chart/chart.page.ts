import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PositionsService } from '../../core/services/positions.service';
import 'chart.js/auto';
import { DoughnutController } from 'chart.js';

Chart.register(DoughnutController);

@Component({
  selector: 'app-posiciones',
  template: '<canvas id="posiciones-chart"></canvas>'
})
export class Estadisticas implements OnInit, AfterViewInit{
  

  constructor(private PositionsService: PositionsService) {}

  ventas: number = 0;
  compras: number = 0;

 
  ngOnInit() {
    this.PositionsService.positions$.subscribe(posiciones => {
      posiciones.forEach((position: any) => {
        if (position.time === 'Venta') {
          this.ventas++;
        } else if (position.time === 'Compra') {
          this.compras++;
        }
      });
      
    });
  }
  createChart() {
    const ctx = (<HTMLCanvasElement>document.getElementById('posiciones-chart')).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Compras', 'Ventas'],
        datasets: [{
          label: '# of Votes',
          data: [this.compras, this.ventas],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  ngAfterViewInit() {
    this.createChart();
  }
}
