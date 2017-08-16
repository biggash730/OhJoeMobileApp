import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
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
  phoneNumber: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider, public storage: Storage) {
    userService.setPage("Verify")
  }

  ionViewDidLoad() {
    this.storage.get(this.userService.PHONENUMBER).then((val) => {
      console.log(val)
      this.phoneNumber = JSON.parse(val)
    });   
    
  }

  verify(){
    

    var obj = {
        phoneNumber: this.phoneNumber, code: this.code
      }
      console.log(obj)
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
              let alert = this.alertCtrl.create({
                title:'Verification Successful', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
              //save the user details and set that login is successful
              //this.userService.setUsername(data.data.name);
              this.userService.setLoggedIn()
              this.userService.setCurrentUser(data.data)
              this.userService.setToken(data.data.token)
              //redirect to the verification page
              this.navCtrl.push(TabsPage);
            }
            else{
              let alert = this.alertCtrl.create({
                title:'Verification Failed', 
                subTitle:data.message,
                buttons:['OK']
              });
              alert.present();
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
      loader.dismissAll();
    }
    }
}
