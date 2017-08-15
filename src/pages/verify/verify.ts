import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
//import { Http } from '@angular/http';
//import { TabsPage } from '../../pages/tabs/tabs';
import { BackendProvider } from '../../providers/backend/backend';
import { TabsPage } from '../../pages/tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  code:string

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider) {
    
  }

  ionViewDidLoad() {
    
    
  }

  verify(){
    var obj = {
        phoneNumber: this.userService.phoneNumber, code: this.code
      }
      //console.log(obj)
    if (!obj.code) {
      let alert = this.alertCtrl.create({
          title:'Verification Error', 
          subTitle:'Please enter the verification code',
          buttons:['OK']
        });
        alert.present();
        return;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Verifying..."
      });
      loader.present();     

      this.backendService.verify(obj).subscribe(data => {
          console.log(data)
          loader.dismissAll();
            if(data.success) 
            {
              //save the user details and set that login is successful
              //redirect to the verification page
              this.navCtrl.push(TabsPage);
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
      loader.dismissAll();
    }
    }
}
