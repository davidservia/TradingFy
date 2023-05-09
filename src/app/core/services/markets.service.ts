import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { Market } from '..';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  getPositionById(positionId: string) {
    throw new Error('Method not implemented.');
  }

  private _marketSubject:BehaviorSubject<Market[]> = new BehaviorSubject([]);
  public markets$ = this._marketSubject.asObservable();


  unsub;
  constructor(
    private firebase:FirebaseService
  ) { 
    this.unsub = this.firebase.subscribeToCollection('markets',this._marketSubject,this.mapMarket)
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  private mapMarket(doc : DocumentData){
    return{
      id:0,
      docId:doc['id'],
      name: doc['data']().name,
      pais: doc['data']().pais,
      userId: doc['data']().userId,
      horario: doc['data']().horario,
      picture: doc['data']().picture
    };
  }


  getMarkets():Market[]{
    var market;
    this.markets$
      .pipe()
      .subscribe(filteredMarkets => {
       market = filteredMarkets;
      });
    return market;
  }

  getMarketsByUserId():Market[]{
    var marketfilteredByUserId;

    this.markets$
      .pipe(
        map(markets => markets.filter(market => market.userId === this.firebase.getUser().uid))
      )
      .subscribe(filteredMarkets => {
        marketfilteredByUserId = filteredMarkets;
      });
      return(marketfilteredByUserId);
  }

  getMarketById(id: string):Promise<Market> {
    return new Promise<Market>(async (resolve, reject)=>{
      try {
        var market = (await this.firebase.getDocument('markets', id));
        resolve({
          id:0,
          docId:market.id,
          name:market.data['name'],
          pais:market.data['pais'],
          userId:market.data['userID'],
          horario:market['horario'],
          picture:market.data['picture']
        });  
      } catch (error) {
        reject(error);
      }
    });
    //this.markets$.pipe(map(markets => markets.filter(market => market.docId === id))).subscribe(filteredMarket => {return filteredMarket});
  }

  async deleteMarketById(market: Market) {
    await this.firebase.deleteDocument('markets',market.docId);
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

  async addMarket(market: Market) {
    var _market = {
      id:0,
      docId: market.docId,
      name: market.name,
      pais: market.pais,
      userId: this.firebase.getUser().uid,
      horario: market.horario
    };
    if (market['pictureFile']){
      var response:FileUploaded = await this.uploadImage(market['pictureFile']);
      _market['picture'] = response.file;
    }
    try {
      await this.firebase.createDocument('markets', _market);
    }catch(error){
      console.log(error);
    }
  }

  async updateMarket(marketItem: Market) {
    var _market = {
      id:0,
      docId: marketItem.docId,
      name: marketItem.name,
      pais: marketItem.pais,
      userId:marketItem.userId,
      horario: marketItem.horario
    };
    if (marketItem['pictureFile']){
      var response:FileUploaded = await this.uploadImage(marketItem['pictureFile']);
      _market['picture'] = response.file;
    }
    try {
      await this.firebase.updateDocument('markets',marketItem.docId, _market);
    }catch(error){
      console.log(error);
    }
  }

  searchMarket(marketItem: Market){
    this.markets$
      .pipe(map(markets => markets.filter(market => marketItem.name === market.name)))
      .subscribe(filteredMarkets => {
        console.log(filteredMarkets);
        return(filteredMarkets);
      });
  }
}
