import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { InicioDeSesionPage } from "../inicio-de-sesion/inicio-de-sesion";


@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
  providers: [NativeStorage]
})
export class RegistroPage {
  posts: any;
  address: string = "https://quehaypahacer.nabu.com.co/index.php/api/usuarios";
  response: any;

  nombre: string;
  apellido: string;
  cedula: string;
  fecha_nacimiento: Date;
  sexo: string;
  telefono: string;
  movil: string;
  email: string;
  user: string;
  pass: string;
  data: any;
  foto: string;
  userID: string;
  tipoAutenticacion: string;

  // newContrasena: string = "";

  constructor(public navCtrl: NavController, public http: Http, public nativeStorage: NativeStorage, private alertCtrl: AlertController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    NativeStorage.getItem('userFB').then(data =>
      this.data = data,
      error =>
        console.log("OK")
    );
  }

  ionViewWillEnter() {
    if (this.data !== undefined) {
      let segundoNombre = this.data.middle_name === "undefined" || this.data.middle_name === undefined ? this.data.middle_name = "" : this.data.middle_name;
      this.nombre = this.data.first_name + " " + segundoNombre;
      this.apellido = this.data.last_name;
      this.fecha_nacimiento = this.data.birth === "undefined" || this.data.birth === undefined ? this.fecha_nacimiento = null : this.data.birth.split('/').reverse().join('-');
      this.sexo = this.data.gender === 'male' ? "Hombre" : "Mujer";
      this.email = this.data.email;
      this.foto = this.data.picture;
      this.userID = this.data.id;
      this.tipoAutenticacion = "FB";

      let alert = this.alertCtrl.create({
        title: 'Solo falta un paso más!',
        message: 'Ya hemos obtenido algunos de tus datos, pero necesitamos que completes el resto para que puedas disfrutar de todas las funcionalidades de la aplicación.',
        buttons: ['OK']
      });
      alert.present();
    }

  }
  goToTabs(params) {
    if (!params) params = {};
    this.navCtrl.push(TabsPage);
  } onGetDatos(params) {
    if (!params) {
      this.http.get(this.address).map(
        res => res.json()).subscribe(data => {
          this.posts = data.data.children;
          //this.onPostDatos(this.posts);
        });
    }
  } onPostDatos() {
    let loading = this.loading.create({
      content: '<strong>Estamos guardando tus datos, espera...</strong>'
    });
    loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let option = new RequestOptions({ headers: headers });
    let nav = this.navCtrl;
    let postParams = {
      "nombre": this.nombre,
      "apellido": this.apellido,
      "cedula": this.cedula,
      "fecha_nacimiento": this.fecha_nacimiento,
      "sexo": this.sexo,
      "telefono": this.telefono,
      "movil": this.movil,
      "email": this.email,
      "user": this.user,
      "pass": this.pass,
      "longitud": null,
      "latitud": null,
      "foto": this.foto === undefined ? this.foto = null : this.foto,
      "userID": this.userID === undefined ? this.userID = null : this.userID,
      "tipoAutenticacion": this.tipoAutenticacion === undefined ? this.tipoAutenticacion = "" : this.tipoAutenticacion
    }

    return this.http.post(this.address, postParams, option)
      .subscribe(data => {
        if (data.status === 200) {
          setTimeout(() => {
            loading.dismiss();
          }, data);
          this.response = data.json();
          NativeStorage.setItem('responseSocialNet',
            {
              tipoAutenticacion: this.response.tipoAutenticacion === undefined || this.response.tipoAutenticacion === 'undefined' ? this.response.tipoAutenticacion = null : this.response.tipoAutenticacion,
            })
            .then(function () {
              console.log('OK responseSocialNet');
            }, function (error) {
              console.log(error);
            })

          switch (this.response.tipoAutenticacion) {
            case 'FB' || 'IG': {
              nav.push(TabsPage);
              break;
            }
            default: {
              nav.push(InicioDeSesionPage);
              break;
            }
          }
        }
      }, error => {
        loading.dismiss();
        switch (error.status) {
          case 501: {
            let alert = this.alertCtrl.create({
              title: 'Ups!',
              subTitle: 'Parece que ya existen datos relacionados con este usuario. Compruebalos o reestablece la contraseña.',
              buttons: ['OK']
            });
            alert.present();
            break;
          }
          case 502: {
            let alert = this.alertCtrl.create({
              title: 'Ups',
              subTitle: 'No se pudo guardar el registro de los datos. Intentalo de nuevo.',
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
