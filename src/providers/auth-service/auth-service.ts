import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
  export class User {
  name: string;
  phoneNumber: string;
  token: string;
 
  constructor(name: string, phoneNumber: string, token: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.token = token;
  }
}
@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  baseUrl : string;
  constructor(public http: Http, private storage: Storage) {
    this.baseUrl = "http://localhost:50776/api/"
  }

  
 
 
  public getUserInfo() : any {
    let user ='currentUser';
    return this.getKeyValue(user);
  }

  public isLoggedIn() : boolean {
    return this.currentUser? true: false;
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
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}