import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import { WindowsAzure } from 'azure-mobile-apps-client';
//import * as WindowsAzure from "azure-mobile-apps-client";
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
//declare var WindowsAzure: any;


@Injectable()
export class UserDataProvider {
  _favorites = [];
  HAS_LOGGED_IN = 'HASLOGGEDIN';
  CURRENT_USER = 'CURRENTUSER';
  USERNAME = 'USERNAME';
  PAGE = 'PAGE';
  PHONENUMBER = 'PHONENUMBER';
  TOKEN = 'TOKEN';

  client: any;
  userid: string;
  remoteFavsTable: any;
  loggedIn: boolean = false;
  baseUrl: string;
  requestOptions: RequestOptions;
  headers: Headers = new Headers;
  phoneNumber: string;

  constructor(public events: Events, public storage: Storage) {
      //this.client = new WindowsAzure.MobileServiceClient("https://ohjoe.azurewebsites.net");
      //window.alert("MobileServiceClient instance: " + this.client);
      //console.log(this.client)
      this.baseUrl = "https://ohjoe.azurewebsites.net/api/";
      //this.baseUrl = "http://localhost:50776/api/";

        this.headers.set('Authorization', "");
        this.headers.append('ZUMO-API-VERSION', '2.0.0');
        this.headers.append('Content-type', 'application/json')
        this.requestOptions = new RequestOptions({headers: this.headers});   

        storage.ready().then(() => {
  
        })
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
      this._favorites.push(sessionName);
      this.saveToLocalStorage();
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
    this.saveToLocalStorage();
  }

  login(provider: string) {      
      this.client.login(provider).done(this.loginResponse.bind(this));
  }

  loginResponse(response: any) {
      this.setUsername(response.userId);      
      this.userid = response.userId;
      this.loggedIn = true;
      this.events.publish('user:login');
      this.syncFavorites();
  }

  signup(name: string) {
      // this.storage.set(this.HAS_LOGGED_IN, true);
      this.events.publish('user:signup');
  }

  logout() {
      this.loggedIn = false;
      this.client.logout();
      this.events.publish('user:logout');
  }

  

  // return a promise
  

  saveToLocalStorage() {
      if (this._favorites.length > 0) {
          this.storage.set('favorites', JSON.stringify(this._favorites));
      }
  }

  syncFavorites() {
      if (this.client && this.loggedIn) {
          let favs = this._favorites.slice(); // local copy
          this.remoteFavsTable = this.client.getTable('favorites');
          this.remoteFavsTable.where({ userId: this.userid }).read()
              .then((data: [any]) => {
                  data.forEach(s => {
                      if (this.hasFavorite(s.sessionName)) {
                          console.log(`remote ${s.sessionName} exist in local`);
                          let pos = favs.indexOf(s.sessionName);
                          favs.splice(pos, 1);
                      } else {
                          this.addFavorite(s.sessionName);
                          console.log(`adding ${s.sessionName} to local`);
                      }
                  });
                  favs.forEach(localFav => this.addToRemoteIfNotExist(localFav));
              });
      }
  }

  addToRemoteIfNotExist(sessionName: string) {
      let favDto = {
          userid: this.userid,
          sessionName: sessionName,
          loginProvider: 'TBD'
      };

      this.remoteFavsTable.where(favDto).read().then((d) => {
          // if nothing found...
          if (d && d.length === 0) {
              // then insert 
              this.remoteFavsTable.insert(favDto);
              console.log(`adding ${sessionName} to remote`);
          }
      });
  }
  
  private cleanRemoteFavs() {
      this.remoteFavsTable = this.client.getTable('favorites');
      this.remoteFavsTable.where({ userid: this.userid }).read()
          .then((favs: [any]) => {
              favs.forEach((f) => {
                  console.log(`removing ${f.id} ${f.sessionName}`);
                  this.remoteFavsTable.del({ id: f.id }).done(
                      () => {
                          console.log('removed: ' + f.id);
                          this.events.publish('favs:sync');
                      },
                      (err) => { console.log('Error Removing:' + JSON.stringify(err)); }
                  );
              });

          });
  }

  cleanFavorites() {
      this._favorites = [];
      if (this.client) {          
          this.storage.remove('favorites');
          this.cleanRemoteFavs();
          console.log('clear favs');          
      }
      this.events.publish('favs:sync');
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
        if(value && value == true) return true;
        else return false;
    });
  }


  public setPage(page) {
    this.storage.set(this.PAGE, JSON.stringify(page));
  }

  public getPage() : any {
    return this.storage.get(this.PAGE).then((val) => {
        return JSON.parse(val)
    });
  }
    
  public setUsername(username) {
    this.storage.set(this.USERNAME, JSON.stringify(username));
  }

  public getUsername() {  
    return this.storage.get(this.USERNAME).then((value) => {
      return JSON.parse(value);
    });
  }
  public setPhoneNumber(phone) {
      this.storage.set(this.PHONENUMBER, JSON.stringify(phone));
    this.phoneNumber = phone;
  }
  public setKeyValue(key,value) {
      this.storage.set(key, JSON.parse(value));    
  }

  public getKeyValue(key) : any {
    return this.storage.get(key).then((val) => {
      return JSON.parse(val)
    });
  }

  public getPhoneNumber() : any {
    return this.storage.get(this.PHONENUMBER).then((val) => {
      return JSON.parse(val)
    });
  }

  public removeKeyValue(key) {
      this.storage.remove(key);    
  }

  public setLoggedIn() {
    this.storage.set(this.HAS_LOGGED_IN, JSON.stringify(true));
  }

  public setCurrentUser(user) {
    this.storage.set(this.CURRENT_USER, JSON.stringify(user));
  }

  public getCurrentUser() : any {
    return this.storage.get(this.CURRENT_USER).then((val) => {
      return JSON.parse(val)
    });
  }

  public setToken(token) {
    this.storage.set(this.TOKEN, JSON.stringify(token));
  }

  public getToken() : any {
    return this.storage.get(this.TOKEN).then((val) => {
      return JSON.parse(val)
    });
  }

}