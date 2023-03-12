import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/angular';
import { ViewContainerRef } from '@angular/core';
import { MarketsService, PositionsService, AssignmentService, AssignmentScheduleComponent } from 'src/app/core';
import { ComponentRef } from '@angular/core';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {


  public calendarOptions: CalendarOptions = this.initCalendar();

  constructor(
    private assignmentsService:AssignmentService,
    private marketsService:MarketsService,
    private positionsService:PositionsService,
    private containerRef: ViewContainerRef
  ) {
    this.assignmentsService.assigns$.subscribe((positions)=>{     
      this.calendarOptions = {
        locale:esLocale,
        initialView: 'timeGridWeek',
        height: 'auto',
        slotDuration: '00:30:00',
        slotLabelInterval: '1:00',
        eventOverlap:false,
        contentHeight:'auto',
        eventChange:(event)=>{
          console.log(event.event.start);
          console.log(event.event.extendedProps['assignment'].dateTime)         
          var assignment = {...event.event.extendedProps['assignment']};
          assignment.dateTime = moment(event.event.start).toISOString();
          this.assignmentsService.updateAssings(assignment);         
        },
        editable:true,
        events: positions.map(async a=>{
          var position = this.positionsService.getPositionById(a.positionId);
          return {
            "title":(await position).name, 
            "start":moment(a.dateTime).toISOString(), 
            "end":moment(a.dateTime).add((await position).time, 'seconds').toISOString(),
            "assignment":a
          };
        }),
        eventContent:(arg)=>{
          var comp:ComponentRef<AssignmentScheduleComponent> = this.containerRef.createComponent(AssignmentScheduleComponent);
          comp.instance.assignment = arg.event.extendedProps['assignment'];
          return { domNodes: [comp.location.nativeElement] }
          
        }
      };     
    });
  }

  public ngOnInit(): void {
    // HACK Rerender the calendar and correctly display it
     setTimeout(() => {
       this.calendarOptions.footerToolbar = false;
     }, 300);
  }

   private initCalendar(): CalendarOptions {
    return {
      initialView: 'timeGridDay',
      height: 'auto',
      slotDuration: '00:30:00',
      slotLabelInterval: '1:00',
      editable:true,
      events: [
    ],
    };
  }
}
