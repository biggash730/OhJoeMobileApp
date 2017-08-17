import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ExplorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  query = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
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

  








  /*

  // Schedule a single notification
this.localNotifications.schedule({
  id: 1,
  text: 'Single ILocalNotification',
  sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
  data: { secret: key }
});


// Schedule multiple notifications
this.localNotifications.schedule([{
   id: 1,
   text: 'Multi ILocalNotification 1',
   sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
   data: { secret:key }
  },{
   id: 2,
   title: 'Local ILocalNotification Example',
   text: 'Multi ILocalNotification 2',
   icon: 'http://example.com/icon.png'
}]);


// Schedule delayed notification
this.localNotifications.schedule({
   text: 'Delayed ILocalNotification',
   at: new Date(new Date().getTime() + 3600),
   led: 'FF0000',
   sound: null
});
  */

}
