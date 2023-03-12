import { NgModule } from '@angular/core';

import { PositionsPageRoutingModule } from './positions-routing.module';

import { CoreModule } from '../../core/core.module';
import { PositionsPage } from './positions.page';

@NgModule({
  imports: [
    CoreModule,
    PositionsPageRoutingModule,
  ],
  declarations: [PositionsPage]
})
export class PositionsPageModule {}