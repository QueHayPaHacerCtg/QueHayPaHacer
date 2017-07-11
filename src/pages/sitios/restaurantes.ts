import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { ReservasEnLineaPage } from '../reservas-en-linea/reservas-en-linea';
// import { ReservaExitosaPage } from '../reserva-exitosa/reserva-exitosa';
import { LaVitrolaPage } from '../sitios/restaurantes/la-vitrola';
import { DonaFridaPage } from '../sitios/restaurantes/dona-frida';
import { LaGirolataPage } from '../sitios/restaurantes/la-girolata';
import { SalouPage } from '../sitios/restaurantes/salou';

@Component({
  selector: 'page-restaurantes',
  templateUrl: 'restaurantes.html'
})
export class RestaurantesPage {
  hoy: String = new Date().toISOString();
  constructor(public navCtrl: NavController) {
  } 
  // goToReservasEnLinea(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(ReservasEnLineaPage);
  // } goToReservaExitosa(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(ReservaExitosaPage);
  // }

  goToLaVitrola(params) {
    if (!params) params = {};
    this.navCtrl.push(LaVitrolaPage);
  }
  goToDonaFrida(params) {
    if (!params) params = {};
    this.navCtrl.push(DonaFridaPage);
  }
  goToLaGirolata(params) {
    if (!params) params = {};
    this.navCtrl.push(LaGirolataPage);
  }
  goToSalou(params) {
    if (!params) params = {};
    this.navCtrl.push(SalouPage);
  }
}
