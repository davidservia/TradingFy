import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Market, Position, PositionDetailComponent, PositionsService } from 'src/app/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-positions',
  templateUrl: './positions.page.html',
  styleUrls: ['./positions.page.scss'],
})
export class PositionsPage {
  filteredPositions:Position[];

  private _filteredSubject:BehaviorSubject<Position[]> = new BehaviorSubject([]);
  public filteredPostions$ = this._filteredSubject.asObservable();
  
  handleChange2(event) {
    const query = event.target.value.toLowerCase();
    this.filteredPositions = this.positionsService.getPositionsByUserId().filter(d => d.name.toLowerCase().indexOf(query) > -1)
    this.updateFilteredPositions();
    
  }

  private updateFilteredPositions() {
    this._filteredSubject.next(this.filteredPositions);
  }

  constructor(
    public positionsService: PositionsService,
    private modal: ModalController,
    private alert: AlertController,
    private translate:TranslateService,
  ) { }

  getPositions(){
    return this.positionsService.getPositionsByUserId();
  }

  async presentPositionForm(position:Position){
    const modal = await this.modal.create({
      component:PositionDetailComponent,
      componentProps:{
        position:position
      }
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.positionsService.addPosition(result.data.position);
            break;
          case 'Edit':
            this.positionsService.updatePosition(result.data.position);
            break;
          default:
        }
      }
    });
  }
  
  onNewPosition(){
    this.presentPositionForm(null);  
  }

  onEditPosition(position){
    this.presentPositionForm(position);
  }

  async onDeleteAlert(position){
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('Position.aviso')),
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
            this.positionsService.deletePositionById(position);
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  onDeletePosition(position){
   this.onDeleteAlert(position);    
  }

}
