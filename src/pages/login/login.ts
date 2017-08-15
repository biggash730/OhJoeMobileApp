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
  data: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider) {
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
    this.data = {}
    this.countries = []
    this.backendService.getCountries().subscribe(data => {
          console.log(data)
            if(data.data.length > 0) 
            {
              this.countries =  data.data
            }
        }, (error) => {
            console.log(error);
    });
    
  }

  login(data){
    let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();
    if (data.phoneNumber === null) {
      //throw("Please enter a valid phone number");
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        return;
    }
    else if (data.countryId === null) {
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
      this.userService.setKeyValue('PHONENUMBER',data.phoneNumber);
      this.backendService.login(data).subscribe(data => {
          console.log(data)
          loader.dismissAll();
            if(data.success) 
            {
              //redirect to the verification page
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
      
    }
    }
}
