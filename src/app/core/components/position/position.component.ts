import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Position } from 'src/app/core/models/position.model';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() position:Position;
  isLowResolution = lowres;

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.position);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.position);
  }

}
