import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-reserva-exitosa',
  templateUrl: 'reserva-exitosa.html'
})
export class ReservaExitosaPage {

  constructor(public navCtrl: NavController) {
  }

  goToCategorias(params){
    if (!params) params = {};
    this.navCtrl.push(TabsPage);
  }
  
}
