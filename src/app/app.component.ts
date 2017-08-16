import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
//import { VerifyPage } from '../pages/verify/verify';

import { UserDataProvider } from '../providers/user-data';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  client  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public userService: UserDataProvider) {
    platform.ready().then(() => {
      //var self = this
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.userService.hasLoggedIn().then((v) => {
        if(v) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
        }
      });

    });
  }
}
