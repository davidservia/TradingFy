import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { PositionsService } from '../../services';

@Component({
  selector: 'app-posiciones',
  template: '<canvas id="posiciones-chart"></canvas>'
})
export class PosicionesComponent {
  posiciones: any[];

  constructor(private PositionsService: PositionsService) {}

  ngOnInit() {
    this.PositionsService.positions$.subscribe(posiciones => {
      this.posiciones = posiciones;
      this.drawChart();
    });
  }

  drawChart() {
    const canvas = document.getElementById('posiciones-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const labels = ['Venta', 'Compra'];
    const data = [
      this.posiciones.filter(p => p.tipo === 'venta').length,
      this.posiciones.filter(p => p.tipo === 'compra').length
    ];
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)'
          ]
        }]
      }
    });
  }
}
