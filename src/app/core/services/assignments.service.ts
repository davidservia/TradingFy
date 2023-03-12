import * as moment from 'moment-timezone';
import { Injectable } from '@angular/core';
import { Assign, Market } from '..';
import { LIST_OF_ASSIGNMENTS } from 'src/assets/data/list-of-assignments';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  updateAssignment(assignment: any) {
    throw new Error('Method not implemented.');
  }

  momentjs:any = moment;
  //private _assign: Assign[] = LIST_OF_ASSIGNMENTS;
  private _assignsSubject: BehaviorSubject<Assign[]> = new BehaviorSubject([]);
  public assigns$ = this._assignsSubject.asObservable()

  unsub;
  constructor(
    private firebase:FirebaseService
  ) { 
    this.unsub = this.firebase.subscribeToCollection('assings',this._assignsSubject,this.mapAssigns)
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  private mapAssigns(doc : DocumentData){
    return{
      id:0,
      docId:doc['id'],
      marketId: doc['data']().marketId,
      positionId: doc['data']().positionId,
      userId: doc['data']().userId,
      dateTime: doc['data']().dateTime
    };
  }

  getAssignment() {
    var assign;
    this.assigns$
      .pipe()
      .subscribe(filteredAssigns => {
        assign = filteredAssigns;
      });
    return assign;
  }

  getAssignmentByUserId(): Observable<Assign[]> {
    return this.assigns$
      .pipe(
        map(assigns => assigns.filter(assign => assign.userId == this.firebase.getUser().uid))
      );
  }

  getAssignmentByMarketId(marketId: string): Assign[] {
    var assingsFilteredByUserId;

    this.assigns$
      .pipe(
        map(assigns => assigns.filter(assign => assign.marketId == marketId))
      )
      .subscribe(filteredMarkets => {
        assingsFilteredByUserId = filteredMarkets;
      });
      return(assingsFilteredByUserId);
  }

  getAssignmentByPositionId(positionId: string): Assign[] {
    var assingsFilteredByUserId;

    this.assigns$
      .pipe(
        map(assigns => assigns.filter(assign => assign.marketId == positionId))
      )
      .subscribe(filteredMarkets => {
        assingsFilteredByUserId = filteredMarkets;
      });
      return(assingsFilteredByUserId);
  }

  async deleteAssignmentById(assign:Assign) {
    await this.firebase.deleteDocument('assings',assign.docId);
  }

  uploadImage(file):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async addAssignmnet(assign: Assign) {
    var _assign = {
      id:0,
      docId: assign.docId,
      marketId: assign.marketId,
      positionId: assign.positionId,
      userId: this.firebase.getUser().uid,
      dateTime: assign.dateTime
    };
    try {
      await this.firebase.createDocument('assings',_assign);
    }catch(error){
      console.log(error);
    }

  }

  async updateAssings(assingItem: Assign) {
    var _assigment = {
      id:0,
      docId: assingItem.docId,
      marketId: assingItem.marketId,
      positionId: assingItem.positionId,
      userId: assingItem.userId,
      dateTime: assingItem.dateTime
    };
    try {
      await this.firebase.updateDocument('assings',assingItem.docId, _assigment);
    }catch(error){
      console.log(error);
    }
  }
}
