import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReservasEnLineaPage } from '../reservas-en-linea/reservas-en-linea';
import { ReservaExitosaPage } from '../reserva-exitosa/reserva-exitosa';

@Component({
  selector: 'page-vida-nocturna',
  templateUrl: 'vida-nocturna.html'
})
export class VidaNocturnaPage {

  constructor(public navCtrl: NavController) {
  }
  goToReservasEnLinea(params){
    if (!params) params = {};
    this.navCtrl.push(ReservasEnLineaPage);
  }goToReservaExitosa(params){
    if (!params) params = {};
    this.navCtrl.push(ReservaExitosaPage);
  }
}
