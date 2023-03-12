import { NgModule } from '@angular/core';

import { MarketsPageRoutingModule } from './markets-routing.module';

import { MarketsPage } from './markets.page';
import { CoreModule } from '../../core/core.module';


@NgModule({
  imports: [
    CoreModule,
    MarketsPageRoutingModule
  ],
  declarations: [MarketsPage]
})
export class MarketsPageModule {}