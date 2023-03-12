import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MarketsService, Market, MarketDetailComponent, PositionsService } from 'src/app/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';



@Component({
  selector: 'app-markets',
  templateUrl: './markets.page.html',
  styleUrls: ['./markets.page.scss'],
})

export class MarketsPage {
  //public data = ['Nasdaq100:Apple,Tlry,Acb', 'Spx500:Adobe,LockyMartin', 'Crypto:Bitcoin,Ethereum', 'CAC40:Intel', 'FTSE:Astrazeneca', 'Nikkei225:Sony', 'Dax30:Teamviewer', 'EuroStoxx:Orange'];

  filteredMarkets:Market[];

  private _filteredSubject:BehaviorSubject<Market[]> = new BehaviorSubject([]);
  public filteredMarkets$ = this._filteredSubject.asObservable();

  handleChange2(event) {
   
    const query = event.target.value.toLowerCase();
   // this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
    this.filteredMarkets = this.marketsService.getMarketsByUserId().filter(d => d.name.toLowerCase().indexOf(query) > -1)
    this.updateFilteredMarkets();
  }

  private updateFilteredMarkets() {
    this._filteredSubject.next(this.filteredMarkets);
  }

  constructor(
    private marketsService: MarketsService,
    private modal:ModalController,
    private alert:AlertController,
    private translate:TranslateService,
    ) {}
 
  getMarkets(){
    return this.marketsService.getMarketsByUserId();
  }

  async presentMarketForm(market:Market){
    const modal = await this.modal.create({
      component:MarketDetailComponent,
      componentProps:{
        market:market
      }
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.marketsService.addMarket(result.data.market);
            break;
          case 'Edit':
            this.marketsService.updateMarket(result.data.market);
            break;
          default:
        }
      }
    });
  }
  
  onNewMarket(){
    this.presentMarketForm(null);  
  }

  onEditMarket(market){
    this.presentMarketForm(market);
  }

  async onDeleteAlert(market){
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('Markets.aviso')),
      buttons: [
        {
          text: await lastValueFrom(this.translate.get('button.cancel')),
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: await lastValueFrom(this.translate.get('button.delete')),
          role: 'confirm',
          handler: () => {
            this.marketsService.deleteMarketById(market);
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  onDeleteMarket(market){
   this.onDeleteAlert(market);    
  }

}
