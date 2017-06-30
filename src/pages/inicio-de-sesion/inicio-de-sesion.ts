import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { CategoriasPage } from '../categorias/categorias';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-inicio-de-sesion',
  templateUrl: 'inicio-de-sesion.html',
  providers: [Facebook, NativeStorage]
})
export class InicioDeSesionPage {
  posts: any;
  address: string = "https://quehaypahacer.nabu.com.co/index.php/api/login";
  FB_APP_ID: number = 1425496617537819;
  user: string;
  pass: string;

  constructor(public navCtrl: NavController, public http: Http, public loadingSpinner: LoadingController,
    public facebook: Facebook, public nativeStorage: NativeStorage) {
    Facebook.browserInit(this.FB_APP_ID, "v2.9");
  }

  goToCategorias(params) {
    if (!params) params = {};
    this.navCtrl.push(CategoriasPage);
  } goToCercaDeM(params) {
    if (!params) params = {};
    this.navCtrl.push(CercaDeMPage);
  } onPostDatos() {
    let loading = this.loadingSpinner.create({
      content: 'Iniciando sesión, espere...'
    });
    loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let option = new RequestOptions({ headers: headers });

    let postParams = {
      "user": this.user,
      "pass": this.pass
    }

    return this.http.post(this.address, postParams, option)
      .subscribe(data => {
        if (data.status === 200) {
          setTimeout(() => {
            loading.dismiss();
          }, data);
          this.navCtrl.push(CategoriasPage);
        }
      }, error => {
        console.log(error);
      });


  }

  doFbLogin() {
    let permisos = new Array<string>();
    let nav = this.navCtrl;
    //the permisos your facebook app needs from the user
    permisos = ["public_profile,email,user_birthday"];

    Facebook.login(permisos)
      .then(function (response) {
        console.log(response);
        let userId = response.authResponse.userID;
        let params = new Array<string>();
        //Getting name and gender properties
        Facebook.api("/me?fields=name,gender,picture,email,birthday", params)
          .then(function (user) {
            console.log(user);
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            NativeStorage.setItem('user',
              {
                name: user.name,
                gender: user.gender
              })
              .then(function () {
                nav.push(CategoriasPage);
              }, function (error) {
                console.log(error);
              })
          })
      }, function (error) {
        console.log(error);
      });
  }

}
