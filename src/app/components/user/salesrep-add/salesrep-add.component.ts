import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-salesrep-add',
  templateUrl: './salesrep-add.component.html',
  styleUrls: ['./salesrep-add.component.scss']
})
export class SalesrepAddComponent implements OnInit {
  inserted = false;
  source: any;
  autocomplete: any;
  componentForm = {
    country: 'long_name',                     // country
  };
  constructor(private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.source = params['source'];
    });
  }

  ngOnInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>(document.getElementById('country')),
      { types: ['(regions)'] });

    this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this));
  }

  onCountryChange(e) {
    const country = e.currentTarget.value;
  }

  fillInAddress() {
    const place = this.autocomplete.getPlace();
    for (const component in this.componentForm) {
      if (this.componentForm.hasOwnProperty(component)) {
        $(`#${component}`).val('');
        // $(`#${component}`).attr('disabled', 'false');
      }
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (this.componentForm[addressType]) {
        const val = place.address_components[i][this.componentForm[addressType]];
        $(`#${addressType}`).val(val);
      }
    }
  }

  addSalesRep(formData: NgForm) {
    console.log("formData", formData,formData.value.email,formData.value.signdate,$('#country').val())
    var that = this;
    if (formData.valid) {
      const config = {
        apiKey: 'AIzaSyDXFg2G-agmNmslaVOVkbWDIyp7hZVlM7Y',
        authDomain: 'loycard-f138e.firebaseapp.com',
        databaseURL: 'https://loycard-f138e.firebaseio.com',
        projectId: 'loycard-f138e',
        storageBucket: 'loycard-f138e.appspot.com',
        messagingSenderId: '562361582837'
      };
      const secondaryApp = firebase.initializeApp(config, 'Secondary');
      secondaryApp.auth().createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(function (firebaseUser) {
          secondaryApp.database().ref('/Role/' + firebaseUser.uid).update({
            email: formData.value.email,
            name: formData.value.name,
            contactno: formData.value.contactno,
            signdate: formData.value.signdate,
            country: $('#country').val(),
            role: 1
          });

          secondaryApp.database().ref('/Representatives/' + firebaseUser.uid).update({
            email: formData.value.email,
            name: formData.value.name,
            contactno: formData.value.contactno,
            signdate: formData.value.signdate,
            country: $('#country').val(),
            role: 1,
            uid: firebaseUser.uid
          });
          firebaseUser.updateProfile({
            displayName: formData.value.name
          }).then(function () {
            if (that.source == 'salesrep-list') {
              that.router.navigate(['salesrep-list']);
            }
            console.log('DisplayName Updated');
          }).catch(function (error) {
            console.log('Error updating displayname');
          });
          formData.reset();
          secondaryApp.auth().signOut();
      console.log("secondaryApp", secondaryApp)
        });
      this.inserted = true;
    }
  }

}
