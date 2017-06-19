import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {

  constructor(public navCtrl: NavController) {
  }
  goToCercaDeM(params){
    if (!params) params = {};
    this.navCtrl.push(CercaDeMPage);
  }
}
