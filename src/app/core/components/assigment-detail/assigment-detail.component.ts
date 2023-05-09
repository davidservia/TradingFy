import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Assign, MarketsService, PositionsService, AssignmentService } from '../..';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assigment-detail.component.html',
  styleUrls: ['./assigment-detail.component.scss'],
})
export class AssignmentDetailComponent {

  form: FormGroup;
  mode: "New" | "Edit" = "New";
  //markets = this.marketsService.getMarkets();
  //positions = this.positionsService.getPositions();

  @Input('assign') set assign(assign: Assign) {
    if (assign) {
      this.form.controls['id'].setValue(assign.id);
      this.form.controls['docId'].setValue(assign.docId);
      this.form.controls['marketId'].setValue(assign.marketId);
      this.form.controls['positionId'].setValue(assign.positionId);
      this.form.controls['userId'].setValue(assign.userId);
      this.form.controls['dateTime'].setValue(assign.dateTime);
      this.mode = "Edit";
    }
  }

  constructor(
    private marketsService: MarketsService,
    private positionsService: PositionsService,
    private assignmentsService: AssignmentService,
    private fb: FormBuilder,
    private modal: ModalController,

  ) {
    this.form = this.fb.group({
      id: [null],
      docId:[''],
      marketId: [-1, [Validators.min(1)]],
      positionId: [-1, [Validators.min(1)]],
      userId:[''],
      dateTime:['', []]
      
    });
  }

  onSubmit() {
    this.modal.dismiss({ assign: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }

  onChangeDateTime(dateTime) {
    console.log(dateTime.detail.value)
    this.form.controls['dateTime'].setValue(dateTime.detail.value);
  }

}
