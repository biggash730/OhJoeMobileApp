import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  imgurl: any
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController, public backendService: BackendProvider,
    public zone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openSettings(){
    this.navCtrl.push(SettingsPage);
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.backendService.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.getProfile();
      })
    })
  }

  getProfile(){
    
  }

}
