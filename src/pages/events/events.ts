import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Component} from '@angular/core';
import { UserDataProvider } from '../../providers/user-data';
import { BackendProvider } from '../../providers/backend/backend';
import { EventDetailsPage } from '../../pages/eventdetails/eventdetails';

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  query = '';
  events = <any>[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public backendService: BackendProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventsPage');
    this.getEvents()
  }

  goToEventDetails(event) {
    this.navCtrl.push(EventDetailsPage, event);
  }

  doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
      }, 2000);
  }

  search() {
    
    
  }

  getEvents() {
    let loader = this.loadingCtrl.create();
      loader.present();
      this.backendService.getNewEvents().subscribe(data => {
          console.log(data)
          loader.dismissAll();
            if(data.success) 
            {
              this.events = data.data              
            }
        }, (error) => {
            loader.dismissAll();
            console.log(error);
      });
    
    
  }

}
