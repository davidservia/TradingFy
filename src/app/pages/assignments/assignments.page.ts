import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Assign } from 'src/app/core/models/assign.model';
import { AssignmentService } from 'src/app/core/services/assignments.service';
import { AssignmentDetailComponent } from 'src/app/core/components/assigment-detail/assigment-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { MarketsService, PositionsService } from 'src/app/core';

@Component({
  selector: 'app-assign',
  templateUrl: './assignments.page.html',
  styleUrls: ['./assignments.page.scss'],
})
export class AssignmentsPage {
  public results = [];
  public results2 = [];

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.results = [];
    } else {
      this.results = this.position.getPositions().filter(d => d.name.toLowerCase().indexOf(query) > -1);
    }
  }
  
  handleChange2(event) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.results2 = [];
    } else {
      this.results2 = this.markets.getMarkets().filter(d => d.name.toLowerCase().indexOf(query) > -1);
    }
  }
  

  constructor(
    private assignService: AssignmentService,
    private modal: ModalController,
    private alert:AlertController,
    private translate:TranslateService,
    private position:PositionsService,
    private markets:MarketsService
  ) { }

  getAssignment(){
    return this.assignService.getAssignmentByUserId();
  }

  async presentAssignForm(assign: Assign){
    const modal = await this.modal.create({
      component:AssignmentDetailComponent,
      componentProps:{
        assign:assign
      }
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.assignService.addAssignmnet(result.data.assign);
            break;
          case 'Edit':
            this.assignService.updateAssings(result.data.assign);
            break;
          default:
        }
      }
    });
  }
  
  onNewAssign(){
    this.presentAssignForm(null);  
  }

  onEditAssign(assign){
    this.presentAssignForm(assign);
  }

  async onDeleteAlert(assign){
    const alert = await this.alert.create({
      header: await lastValueFrom(this.translate.get('Assignments.aviso')),
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
            this.assignService.deleteAssignmentById(assign);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  onDeleteAssign(assign){
   this.onDeleteAlert(assign);    
  }
  
}
