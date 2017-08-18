import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserDataProvider } from '../../providers/user-data';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BackendProvider {

    nativepath: any;
  constructor(public http: Http,public userService: UserDataProvider,public filechooser: FileChooser) {
    //console.log('Hello BackendProvider Provider');
  }

  getCountries(){
      return this.http.get(this.userService.baseUrl+"countries", {headers: this.userService.headers})
      .map(res => res.json());    
  }

  login(obj){
      return this.http.post(this.userService.baseUrl+"login", obj, {headers: this.userService.headers})
      .map(res => res.json());    
  }

  verify(obj){
      return this.http.post(this.userService.baseUrl+"verify", obj, {headers: this.userService.headers})
      .map(res => res.json());    
  }

  getNewEvents(){
      return this.http.get(this.userService.baseUrl+"events", {headers: this.userService.headers})
      .map(res => res.json());    
  }

  getUserEvents(){
      return this.http.get(this.userService.baseUrl+"userevents", {headers: this.userService.headers})
      .map(res => res.json());    
  }

  uploadimage() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  //var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                  /*imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })*/
                }
              })
            })
          })
      })
    })    
     return promise;   
  }


}
