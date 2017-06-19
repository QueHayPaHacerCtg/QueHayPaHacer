import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CategoriasPage } from '../categorias/categorias';

@Component({
  selector: 'page-reserva-exitosa',
  templateUrl: 'reserva-exitosa.html'
})
export class ReservaExitosaPage {

  constructor(public navCtrl: NavController) {
  }

  goToCategorias(params){
    if (!params) params = {};
    this.navCtrl.push(CategoriasPage);
  }
  
}
