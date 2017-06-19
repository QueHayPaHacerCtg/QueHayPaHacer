import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  posts: any;
  address: string = "http://192.168.0.81:8000/api/v1/users/";
  usuario: string = "";
  email: string = "";
  nombre: string = "";
  apellido: string = "";
  newContrasena: string ="";

  constructor(public navCtrl: NavController, public http: Http) {

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
      "id": 4,
      "username": this.usuario,
      "auth_token": "8829dfc1ba628aaa7dfaaca0c7766a541d5c2170",
      "email": this.email,
      "first_name": this.nombre,
      "last_name": this.apellido,
      "is_active": true,
      "is_staff": true,
      "is_superuser": true,
      "date_joined": "2017-06-17T19:46:42+0000",
      "xperience": null,
      "bornday": null,
      "shopper_points": null,
      "password": this.newContrasena
    }

    this.http.post("http://192.168.0.81:8000/api/v1/users/", postParams,option).subscribe(data=>{
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });
  }
}
