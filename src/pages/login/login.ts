import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Http } from '@angular/http';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  
})
export class LoginPage {
  countries:any[]

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(provider: string) {
      this.userService.login(provider);
      this.navCtrl.push(TabsPage);
  }

  loginWithFb(){
    this.userService.login("facebook");
    this.navCtrl.push(TabsPage);
    
  }

  loginWithGl(){
    this.userService.login("facebook");
    this.navCtrl.push(TabsPage);
    
  }
}
