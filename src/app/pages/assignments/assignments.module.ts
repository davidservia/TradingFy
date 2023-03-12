import { NgModule } from '@angular/core';

import { AssignPageRoutingModule } from './assignments-routing.module';

import { CoreModule } from '../../core/core.module';
import { AssignmentsPage } from './assignments.page';

@NgModule({
  imports: [
    CoreModule,
    AssignPageRoutingModule
  ],
  declarations: [AssignmentsPage]
})
export class AssignmentsPageModule {}
