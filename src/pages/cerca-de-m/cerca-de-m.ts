import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VidaNocturnaPage } from '../vida-nocturna/vida-nocturna';
import { ReservasEnLineaPage } from '../reservas-en-linea/reservas-en-linea';
import { ReservaExitosaPage } from '../reserva-exitosa/reserva-exitosa';

@Component({
  selector: 'page-cerca-de-m',
  templateUrl: 'cerca-de-m.html'
})
export class CercaDeMPage {
  hoy: String = new Date().toISOString();
  constructor(public navCtrl: NavController) {
  }
  goToVidaNocturna(params) {
    if (!params) params = {};
    this.navCtrl.push(VidaNocturnaPage);
  } goToReservasEnLinea(params) {
    if (!params) params = {};
    this.navCtrl.push(ReservasEnLineaPage);
  } goToReservaExitosa(params) {
    if (!params) params = {};
    this.navCtrl.push(ReservaExitosaPage);
  }
}
