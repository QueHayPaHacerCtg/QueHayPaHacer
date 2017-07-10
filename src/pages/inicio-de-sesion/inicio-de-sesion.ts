import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, Nav } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { CategoriasPage } from '../categorias/categorias';
import { RegistroPage } from '../registro/registro';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Auth, User } from '@ionic/cloud-angular';
import 'rxjs/add/operator/catch';

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
  data: any;
  response: any;

  constructor(public navCtrl: NavController, public http: Http, public loadingSpinner: LoadingController,
    public facebook: Facebook, public nativeStorage: NativeStorage, private alertCtrl: AlertController,
    public authInst: Auth, public userInst: User) {
    Facebook.browserInit(this.FB_APP_ID, "v2.9");
  }

  @ViewChild(Nav) nav: Nav;

  ionViewDidLoad() {
    NativeStorage.getItem('responseSocialNet').then(data =>
      this.data = data.tipoAutenticacion,
      error =>
        console.log("No hay tipoAutenticacion")
    );
  }

  ionViewWillEnter() {
    if (this.data === null || this.data === "null") {
      let alert = this.alertCtrl.create({
        title: 'Bienvenido!',
        message: "Bienvenido a <strong>Qué Hay Pa' Hacer Cartagena</strong>. Ya puedes iniciar sesión. Tus datos han sido guardados correctamente.",
        buttons: ['¡Bien!']
      });
      alert.present();
    }
  }

  goToCategorias(params) {
    if (!params) params = {};
    this.navCtrl.push(CategoriasPage);
  } onPostDatos() {
    if ((this.user === undefined && this.pass === undefined) ||
      (this.user === "" && this.pass === undefined) ||
      (this.user === undefined && this.pass === "") ||
      (this.user === "" && this.pass === "") ||
      (this.user === "" || this.pass === "" || this.user === undefined || this.pass === undefined)) {
      let alert = this.alertCtrl.create({
        title: 'Campos sin llenar',
        subTitle: 'Comprueba que ambos campos estan llenos.',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let loading = this.loadingSpinner.create({
        content: '<strong>Iniciando sesión, espere...</strong>'
      });
      loading.present();
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let option = new RequestOptions({ headers: headers });
      let env = this;
      let postParams = {
        "user": this.user,
        "pass": this.pass
      }

      return this.http.post(this.address, postParams, option)
        .subscribe(data => {
          console.log(data);
          if (data.status === 200) {
            setTimeout(() => {
              loading.dismiss();
            }, data);
            this.response = data.json();
            NativeStorage.setItem('user',
              {
                token: this.response
              })
              .then(function () {
                env.navCtrl.push(TabsPage);
                console.log("TODO OK!");
              }, function (error) {
                console.log(error);
              })
          }
        }, error => {
          loading.dismiss();
          // console.log(error);
          switch (error.status) {
            case 403: {
              let alert = this.alertCtrl.create({
                title: 'Contraseña Incorrecta',
                subTitle: 'Comprueba que has colocado la contraseña correctamente.',
                buttons: ['OK']
              });
              alert.present();
              break;
            }
            case 404: {
              let alert = this.alertCtrl.create({
                title: 'Usuario no encontrado',
                subTitle: 'No existe un usuario con este nombre. Comprueba que lo has colocado correctamente',
                buttons: ['OK']
              });
              alert.present();
              break;
            }
            case 500: {
              let alert = this.alertCtrl.create({
                title: 'Ups!',
                subTitle: 'Parece que hay problemas de comunicación. Comprueba si tienes una conexión a Internet activa',
                buttons: ['OK']
              });
              alert.present();
              break;
            }

          }
        });
    }
  }

  doFbLogin() {
    let permisos = new Array<string>();
    let nav = this.navCtrl;
    let alert = this.alertCtrl.create({
      title: 'Ups!',
      subTitle: 'Parece que ha habido un problema. Esto puede ocurrir si cancelaste el proceso o quizás algún problema de conexión.',
      buttons: ['OK']
    });
    NativeStorage.remove('user');
    //the permisos your facebook app needs from the user
    permisos = ["public_profile,email,user_birthday"];

    Facebook.login(permisos)
      .then(function (response) {
        console.log(response);
        let userId = response.authResponse.userID;
        let params = new Array<string>();
        //Getting name and gender properties
        Facebook.api("/me?fields=first_name,middle_name,last_name,gender,picture,email,birthday", params)
          .then(function (user) {
            console.log(user);
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
            NativeStorage.setItem('userFB',
              {
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                gender: user.gender,
                email: user.email,
                birth: user.birthday,
                picture: user.picture,
                id: user.id
              })
              .then(function () {
                nav.push(RegistroPage);
              }, function (error) {
                console.log(error);
              })
          }, function (error) {
            console.log(error);
            alert.present();
          });
      }, function (error) {
        console.log(error);
        alert.present();
      });
  }
  doInstagramLogin() {
    this.authInst.login('instagram').then(function(data) {
      console.log(data);
    });
  }

}
