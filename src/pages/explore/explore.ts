import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,private localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
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
