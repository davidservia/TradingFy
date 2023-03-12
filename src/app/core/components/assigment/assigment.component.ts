import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { Assign, MarketsService, PositionsService, Position, Market } from '../..';

@Component({
  selector: 'app-assignment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.scss'],
})
export class AssignmentComponent {

  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() assign:Assign;

  isLowResolution = lowres;


  private _market:BehaviorSubject<Market[]> = new BehaviorSubject([]);
  private _position:BehaviorSubject<Position[]> = new BehaviorSubject([]);
  public market$ = this._market.asObservable();
  public position$ = this._position.asObservable();

  constructor(
    private marketsService: MarketsService,
    private positionsService: PositionsService,
  ) {
    this.loadMarketandPositions(this.assign);
  }

  private async loadMarketandPositions(a:Assign){
    if (!a) {
      console.error('No se ha proporcionado un objeto Assign válido');
      return;
    }
    this._market.next(await this.marketsService.getMarketById(a.marketId));
    this._position.next(await this.positionsService.getPositionById(a.positionId));
  }


  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.assign);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.assign);
  }

}
