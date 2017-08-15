import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserDataProvider } from '../../providers/user-data';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BackendProvider {

  constructor(public http: Http,public userService: UserDataProvider) {
    //console.log('Hello BackendProvider Provider');
  }

  getCountries(){
      return this.http.get(this.userService.baseUrl+"countries", {headers: this.userService.headers})
      .map(res => res.json());    
  }

  login(object){
      return this.http.post(this.userService.baseUrl+"account/login", {headers: this.userService.headers})
      .map(res => res.json());    
  }

}
