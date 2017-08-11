import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';

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

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(phone){

    if (phone === null) {
      //throw("Please enter a valid phone number");
    } else {
      this.authService.setKeyValue('PHONENUMBER',phone);
      let data = this.http.get(this.authService.baseUrl+"account/login?phoneNumber="+phone)
      .map(res => res.json())
      .subscribe(data => {
          console.log(data)
            if(data.result == 1) 
            {
              //redirect to the verification page
                
            }

        }, (error) => {
            console.log(error);
        });
    }
    }

}
