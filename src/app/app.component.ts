import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { UserDataProvider } from '../providers/user-data';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  client  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public userService: UserDataProvider, public storage: Storage,private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      //var self = this
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.storage.get(this.userService.HAS_LOGGED_IN).then((val) => {
      var res = JSON.parse(val);
        if(res) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
        }
      });

    });
  }
}
