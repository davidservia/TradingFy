import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PositionsService } from '../../core/services/positions.service';
import { Estadisticas } from './chart.page';
import { EstadisticasRoutingModule } from './chart-routing.module';

@NgModule({
  declarations:[Estadisticas],
  imports: [
    CommonModule,
    IonicModule,
    EstadisticasRoutingModule
  ],
})
export class EstadisticasModule { }
