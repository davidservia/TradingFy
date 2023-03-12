import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { MarketsService, Market } from '../..';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MarketSelectableComponent),
  multi: true
}

@Component({
  selector: 'app-market-selectable',
  templateUrl: './market-selectable.component.html',
  styleUrls: ['./market-selectable.component.scss'],
  providers: [USER_PROFILE_VALUE_ACCESSOR]
})
export class MarketSelectableComponent implements OnInit, ControlValueAccessor {
  selectedMarket: Market = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private marketsService: MarketsService
  ) { }

  async writeValue(obj: any){
    try{
      this.selectedMarket = await this.marketsService.getMarketById(obj);
    }catch(error){
      console.log("No se ha podido recupera los datos: "+error)
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

  getMarkets() {
    return this.marketsService.getMarkets();
  }

  onMarketClicked(market:Market, accordion?:IonAccordionGroup){
    this.selectedMarket = market;
    accordion.value = '';
    this.propagateChange(this.selectedMarket.docId);
  }
  
}
