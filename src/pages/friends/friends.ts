import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  allContacts: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts) {
      contacts.find(['*'], {filter: "", multiple: true})
    .then(data => {
       alert(JSON.stringify(data[0]));
      this.allContacts = data
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
