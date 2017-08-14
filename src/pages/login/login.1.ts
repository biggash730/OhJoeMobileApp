/*import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Http } from '@angular/http';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

/*@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  
})
export class LoginPage {
  countries:any[]

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController) {
    //this.init()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*login(phone){
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
      this.authService.setKeyValue('PHONENUMBER',phone);
      let data = this.http.get(this.authService.baseUrl+"account/login?phoneNumber="+phone)
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
    }*/

  /*login(provider: string) {
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

    /*getCountries(){
        let data = this.http.get(this.authService.baseUrl+"public/getcountries")
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

    init(){
      //this.getCountries()

    }

}*/
