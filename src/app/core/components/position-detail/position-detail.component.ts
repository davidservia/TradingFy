import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Position } from 'src/app/core/models/position.model';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss'],
})
export class PositionDetailComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('position') set position(position:Position){
    if(position){
      this.form.controls['id'].setValue(position.id);
      this.form.controls['docId'].setValue(position.docId);
      this.form.controls['name'].setValue(position.name);
      this.form.controls['time'].setValue(position.time);
      this.form.controls['valor'].setValue(position.valor);
      this.form.controls['userId'].setValue(position.userId);
      this.form.controls['picture'].setValue(position.picture);
      if(position.picture)
        this.currentImage.next(position.picture);
      this.mode = "Edit";
    }
  }
  
  constructor(
    public platform:PlatformService,
    private fb:FormBuilder,
    private modal:ModalController,
    private photoSvc:PhotoService,
    private userSVC : UserService,
    private cdr: ChangeDetectorRef 
  ) { 
    this.form = this.fb.group({
      id:[null],
      docId:[''],
      name:['', [Validators.required]],
      time:['', [Validators.required]],
      userId:[''],
      valor:[''],
      picture:[''],
      pictureFile:[null]
    });
  }

  onSubmit(){   
    this.modal.dismiss({position: this.form.value, mode:this.mode}, 'ok');
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
