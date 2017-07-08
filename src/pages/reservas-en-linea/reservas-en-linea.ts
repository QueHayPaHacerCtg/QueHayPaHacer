import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReservaExitosaPage } from '../reserva-exitosa/reserva-exitosa';

@Component({
  selector: 'page-reservas-en-linea',
  templateUrl: 'reservas-en-linea.html'
})
export class ReservasEnLineaPage {
  hoy: String = new Date().toISOString();
  constructor(public navCtrl: NavController) {
  }
  goToReservaExitosa(params) {
    if (!params) params = {};
    this.navCtrl.push(ReservaExitosaPage);
  }
}
