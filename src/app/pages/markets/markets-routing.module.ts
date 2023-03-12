import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketsPage } from './markets.page';

const routes: Routes = [
  {
    path: '',
    component: MarketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketsPageRoutingModule {}