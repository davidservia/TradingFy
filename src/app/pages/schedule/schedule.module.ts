import { NgModule } from '@angular/core';
import { SchedulePage } from './schedule.page';
import { CalendarPageRoutingModule } from './schedule-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import scrollgridPlugin from '@fullcalendar/scrollgrid';
import daygridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  scrollgridPlugin,
  daygridPlugin,
  timegridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CoreModule,
    CalendarPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [SchedulePage]
})
export class SchedulePageModule {}