import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
//import { Http } from '@angular/http';
//import { TabsPage } from '../../pages/tabs/tabs';
import { BackendProvider } from '../../providers/backend/backend';
import { VerifyPage } from '../../pages/verify/verify';

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
    userService.setPage("Login")
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

  login(){
    var obj = {
        phoneNumber: this.phoneNumber, countryId: this.countryId
      }
      console.log(obj)
    if (!obj.phoneNumber) {
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();        
        return;
    }
    else if (!obj.countryId) {
      let alert = this.alertCtrl.create({
          title:'Country Error', 
          subTitle:'Please select your country',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Hold on tight..."
      });
      loader.present();
      //this.userService.setKeyValue('PHONENUMBER',obj.phoneNumber);      

      this.backendService.login(obj).subscribe(data => {
          console.log(data)
          loader.dismissAll();
            if(data.success) 
            {
              this.userService.setPhoneNumber(data.data)
              //redirect to the verification page
              let alert = this.alertCtrl.create({
                title:'Login Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              this.navCtrl.push(VerifyPage);
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
      loader.dismissAll();
    }
    }
}
