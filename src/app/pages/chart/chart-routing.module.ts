import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Estadisticas } from './chart.page';

const routes: Routes = [
  {
    path:'',
    component:Estadisticas
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
