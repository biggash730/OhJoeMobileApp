import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { WindowsAzure } from 'azure-mobile-apps-client';
//import * as WindowsAzure from "azure-mobile-apps-client";
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/



@Injectable()
export class UserDataProvider {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';

  client: any;
  userid: string;
  remoteFavsTable: any;
  loggedIn: boolean = false;

  constructor(public events: Events, private storage: Storage, private windowsAzure: WindowsAzure) {
    this.client = this.windowsAzure.MobileServiceClient('https://ohjoe.azurewebsites.net');;
    console.log(this.client)
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

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {  
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

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


  public setPage(page) {
    this.storage.set('page', page);
  }

  public getPage() : any {
    return this.storage.get('page').then((val) => {
      return val
    });
  }
  public setKeyValue(key,value) {
    this.storage.set(key, value);
  }

  public getKeyValue(key) : any {
    return this.storage.get(key).then((val) => {
      return val
    });
  }

}