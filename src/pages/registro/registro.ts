import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { CategoriasPage } from '../categorias/categorias';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';
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

  // newContrasena: string = "";

  constructor(public navCtrl: NavController, public http: Http, public nativeStorage: NativeStorage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    NativeStorage.getItem('user').then(data =>
      this.data = data,
      error =>
        console.log("OK")
    );
  }

  ionViewWillEnter() {
    if (this.data !== undefined) {
      let segundoNombre = this.data.middle_name = "undefined" ? "" : this.data.middle_name;
      this.nombre = this.data.first_name + " " + segundoNombre;
      this.apellido = this.data.last_name;
      this.fecha_nacimiento = this.data.birth = "undefined" ? this.fecha_nacimiento = null : this.data.birth.split('/').reverse().join('-');
      this.sexo = this.data.gender = 'male' ? "Hombre" : "Mujer";
      this.email = this.data.email;

      let alert = this.alertCtrl.create({
        title: 'Solo falta un paso más!',
        message: 'Ya hemos obtenido algunos de tus datos, pero necesitamos que completes el resto para que puedas disfrutar de todas las funcionalidades de la aplicación.',
        buttons: ['OK']
      });
      alert.present();
    }

  }
  goToCategorias(params) {
    if (!params) params = {};
    this.navCtrl.push(CategoriasPage);
  } goToCercaDeM(params) {
    if (!params) params = {};
    this.navCtrl.push(CercaDeMPage);
  } onGetDatos(params) {
    if (!params) {
      this.http.get(this.address).map(
        res => res.json()).subscribe(data => {
          this.posts = data.data.children;
          //this.onPostDatos(this.posts);
        });
    }
  } onPostDatos() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let option = new RequestOptions({ headers: headers });

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
      "latitud": null

    }

    return this.http.post(this.address, postParams, option)
      .subscribe(data => {
        if (data.status === 200) {
          this.navCtrl.push(InicioDeSesionPage);
        }
      }, error => {
        console.log(error);
      });
  }

}
