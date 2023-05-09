import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { Position, PositionsService } from '../..';

export const POSITION_PROFILE_VALUE_ACCESSOR: any = {
  provide:  NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PositionSelectableComponent),
  multi: true
}

@Component({
  selector: 'app-position-selectable',
  templateUrl: './position-selectable.component.html',
  styleUrls: ['./position-selectable.component.scss'],
  providers: [POSITION_PROFILE_VALUE_ACCESSOR]
})
export class PositionSelectableComponent implements OnInit, ControlValueAccessor {

  selectedPosition: Position = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private positionsService: PositionsService
  ) { }

  async writeValue(obj: any)  {
    try{
    this.selectedPosition = await this.positionsService.getPositionById(obj);;
    }catch(error){
      console.log("No se ha podido recuperar los datos : "+error)
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getPositions() {
    return this.positionsService.getPositions();
  }

  onPositionClicked(position:Position, accordion: IonAccordionGroup){
    this.selectedPosition = position;
    accordion.value = '';
    this.propagateChange(this.selectedPosition.docId);
  }

}
