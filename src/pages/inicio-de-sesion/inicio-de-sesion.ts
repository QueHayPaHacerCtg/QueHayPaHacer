import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingSpinner } from '../../services/LoadingSpinner';

@Component({
  selector: 'page-inicio-de-sesion',
  templateUrl: 'inicio-de-sesion.html'
})
export class InicioDeSesionPage {
  posts: any;
  address: string = "http://quehaypahacer.nabu.com.co/index.php/api/login";

  user: string;
  pass: string;

  constructor(public navCtrl: NavController, public http: Http, public loadingSpinner: LoadingController) {
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

}
