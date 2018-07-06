import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],

})
export class OfferListComponent implements OnInit {
  offers$;
  offers;
  offerLists;
  constructor(private offerService: OfferService) {
    this.offers$ = this.offerService.getOffers().valueChanges().subscribe(data => {
      this.offers = data;
    });
  }

  ngOnInit() {
  }

}
