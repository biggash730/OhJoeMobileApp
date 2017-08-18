import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule} from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { VerifyPage } from '../pages/verify/verify';
import { IntroPage } from '../pages/intro/intro';
import { TermsPage } from '../pages/terms/terms';
import { SettingsPage } from '../pages/settings/settings';
import { ExplorePage } from '../pages/explore/explore';
import { EventsPage } from '../pages/events/events';
import { EventDetailsPage } from '../pages/eventdetails/eventdetails';
import { FriendsPage } from '../pages/friends/friends';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserDataProvider } from '../providers/user-data';
import { BackendProvider } from '../providers/backend/backend';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    TermsPage,
    LoginPage,
    VerifyPage,
    TabsPage,
    SettingsPage,
    ExplorePage,
    EventsPage,
    EventDetailsPage,
    FriendsPage,
    AboutPage,
    ContactPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    TermsPage,
    LoginPage,
    VerifyPage,
    TabsPage,
    SettingsPage,
    ExplorePage,
    EventsPage,
    EventDetailsPage,
    FriendsPage,
    AboutPage,
    ContactPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider,
    BackendProvider,
    Contacts,
    LocalNotifications
  ]
})
export class AppModule {}
