import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Http, RequestOptions } from '@angular/http';
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
  data: any

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.countries = [{id:1,name:"Ghana",code:"233",title:"Ghana - 233"}]
    this.getCountries()
    this.data = {}
  }

  login(phone){
    let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();
    if (phone === null) {
      //throw("Please enter a valid phone number");
      let alert = this.alertCtrl.create({
          title:'Phone Number Error', 
          subTitle:'Please enter a valid phone number',
          buttons:['OK']
        });
        alert.present();
        loader.dismissAll();
        return;
    } else {
      this.userService.setKeyValue('PHONENUMBER',phone);
      let data = this.http.get(this.userService.baseUrl+"account/login?phoneNumber="+phone)
      .map(res => res.json())
      .subscribe(data => {
          console.log(data)
          loader.dismissAll();
            if(data.result == 1) 
            {
              //redirect to the verification page
                
            }

        }, (error) => {
            console.log(error);
        });
    }
    }

  

    getCountries(){
      
        let data = this.http.get(this.userService.baseUrl+"shared/getcountries", {headers: this.userService.headers})
      .map(res => res.json())
      .subscribe(data => {
          console.log(data)
            if(data.result == 1) 
            {
              this.countries = data.data
            }

        }, (error) => {
            console.log(error);
        });
    
    }

  
}
