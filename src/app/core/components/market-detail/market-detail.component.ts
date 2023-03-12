import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Market } from '../..';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';


@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})

export class MarketDetailComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('market') set market(market:Market){
    if(market){
      this.form.controls['id'].setValue(market.id);
      this.form.controls['docId'].setValue(market.docId);
      this.form.controls['name'].setValue(market.name);
      this.form.controls['pais'].setValue(market.pais);
      this.form.controls['userId'].setValue(market.userId);
      this.form.controls['horario'].setValue(market.horario);
      this.form.controls['picture'].setValue(market.picture);
      if(market.picture)
        this.currentImage.next(market.picture);
      this.mode = "Edit";
    }
  }
  
  constructor(
    public platform:PlatformService,
    private fb:FormBuilder,
    private modal:ModalController,
    private photoSvc:PhotoService,
    private cdr: ChangeDetectorRef 
  ) { 
    this.form = this.fb.group({
      id:[null],
      docId:[''],
      name:['', [Validators.required]],
      pais:['', [Validators.required]],
      userId:[''],
      horario:['', [Validators.required]],
      picture:[''],
      pictureFile:[null]
    });
  }

  onSubmit(){   
    this.modal.dismiss({market: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls['pictureFile'].setValue(item.blob);
  }

}
