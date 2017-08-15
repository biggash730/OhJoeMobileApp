import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
//import { Http } from '@angular/http';
import { TabsPage } from '../../pages/tabs/tabs';
import { BackendProvider } from '../../providers/backend/backend';

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
  phoneNumber:string;
  countryId:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider) {
    
  }

  ionViewDidLoad() {
    this.countries = []
    this.backendService.getCountries().subscribe(data => {
          if(data.data.length > 0) 
            {
              this.countries =  data.data
            }
        }, (error) => {
            console.log(error);
    });
    
  }

  login(phoneNumber, countryId){
    let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();
    if (!phoneNumber) {
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        return;
    }
    else if (!countryId) {
      let alert = this.alertCtrl.create({
          title:'Country Error', 
          subTitle:'Please select your country',
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        return;
    }
    else {
      this.userService.setKeyValue('PHONENUMBER',phoneNumber);
      var obj = {
        phoneNumber: phoneNumber, countryId: countryId
      }
      console.log(obj)
      /*this.backendService.login(obj).subscribe(data => {
          console.log(data)
          loader.dismissAll();
            if(data.success) 
            {
              //redirect to the verification page
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });*/
      
    }
    }
}
