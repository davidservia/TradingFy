import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assign } from 'src/app/core/models/assign.model';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { MarketsService } from 'src/app/core/services/markets.service';
import { PositionsService } from 'src/app/core/services/positions.service';
import { Market } from 'src/app/core/models/market.model';
import { Position } from 'src/app/core/models/position.model';

@Component({
  selector: 'app-assignment-schedule',
  templateUrl: './assignment-schedule.component.html',
  styleUrls: ['./assignment-schedule.component.scss'],
})
export class AssignmentScheduleComponent implements OnInit {

  @Input() assignment:Assign;
  isLowResolution = lowres;
  constructor(
    private marketsSvc:MarketsService,
    private positionsSvc:PositionsService, ){

  }

  ngOnInit(
  ) {

  }

  getPosition(){
    var positionId = this.assignment.positionId;
    if(positionId)
      return this.positionsSvc.getPositionById(positionId);
    return undefined;
  }

  getMarket(){
    var marketId = this.assignment.marketId;
    if(marketId)
      return this.marketsSvc.getMarketById(marketId);
    return undefined;
  }
}
