import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';

@Component({
  selector: 'page-inicio-de-sesion',
  templateUrl: 'inicio-de-sesion.html'
})
export class InicioDeSesionPage {

  constructor(public navCtrl: NavController) {
  }
  goToCategorias(params){
    if (!params) params = {};
    this.navCtrl.push(CategoriasPage);
  }goToCercaDeM(params){
    if (!params) params = {};
    this.navCtrl.push(CercaDeMPage);
  }
}
