import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Market } from '../../models';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})


export class MarketComponent {
 /* 
 public data = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
  public results = [...this.data];

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }
  */

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() market:Market;

  onEditClick(){
    this.onEdit.emit(this.market);
  }

  onDeleteClick(){
    this.onDelete.emit(this.market);
  }

  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e:Event) {
    this.popover.Event = e
    this.isOpen = true;
  }

  onDismiss(result){
    this.popover.dismiss(null, 'cancel');
  }
  
   
}
