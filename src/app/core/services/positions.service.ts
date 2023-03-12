import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { Position } from '..';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private _positionSubject:BehaviorSubject<Position[]> = new BehaviorSubject([]);
  public positions$ = this._positionSubject.asObservable();

  unsub;
  constructor(
    private firebase:FirebaseService,
    private userSVC:UserService
    
  ) { 
    this.unsub = this.firebase.subscribeToCollection('position',this._positionSubject,this.mapPositions);

    
  }

  private mapPositions(doc : DocumentData){
    return{
      id:0,
      docId:doc['id'],
      name: doc['data']().name,
      time: doc['data']().time,
      userId: doc['data']().userId,
      valor: doc['data']().valor,
      picture: doc['data']().picture
    };
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  getPositions(): Position[] {
    var position;
    this.positions$.pipe().subscribe(filteredPositions => { 
      
      position = filteredPositions;
    });
    return position;
  }

  getPositionsByUserId():Position[]{
    var positionfilteredByUserId;

    this.positions$
      .pipe(
        map(positions => positions.filter(position => position.userId === this.firebase.getUser().uid))
      )
      .subscribe(filteredPositions => {
        positionfilteredByUserId = filteredPositions;
      });
      return(positionfilteredByUserId);
  }

  getPositionById(id:string):any{
    this.positions$.pipe(map(positions => positions.filter(position => position.docId === id))).subscribe(filteredPosition => {return filteredPosition});
  }

  async deletePositionById(position:Position){
     await this.firebase.deleteDocument('position',position.docId);
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

  async addPosition(position:Position){
    var _position = {
      id:0,
      docId: position.docId,
      name: position.name,
      time: position.time,
      userId: this.firebase.getUser().uid,
      valor: position.valor,
    };
    if (position['pictureFile']){
      var response:FileUploaded = await this.uploadImage(position['pictureFile']);
      _position['picture'] = response.file;
    }
    try {
      await this.firebase.createDocument('position', _position);
    }catch(error){
      console.log(error);
    }
  }

  async updatePosition(positionItem:Position){
    var _position = {
      id:0,
      docId: positionItem.docId,
      name: positionItem.name,
      time: positionItem.time,
      userId: positionItem.userId,
      valor: positionItem.valor
    };
    if (positionItem['pictureFile']){
      var response:FileUploaded = await this.uploadImage(positionItem['pictureFile']);
      _position['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('position',positionItem.docId, _position);
    }catch(error){
      console.log(error);
    }
  }

  searchMarket(positionItem: Position){
    this.positions$
      .pipe(map(position => position.filter(position => positionItem.name === position.name)))
      .subscribe(filteredMarkets => {
        console.log(filteredMarkets);
        return(filteredMarkets);
      });
  }

}
