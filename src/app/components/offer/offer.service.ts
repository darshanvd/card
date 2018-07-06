import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OfferService {

  constructor(private afDb: AngularFireDatabase) { }

  createOffer(offer){
    return this.afDb.list('/LoyaltyOffers').push(offer);
  }

  getOffers(){ // return offers of the current vendor
    const vendorid = localStorage.getItem('userId');
    return this.afDb.list('/LoyaltyOffers',ref => ref.orderByChild('vendorID').equalTo(vendorid));
  }

}
