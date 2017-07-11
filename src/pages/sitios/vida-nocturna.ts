import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReservasEnLineaPage } from '../reservas-en-linea/reservas-en-linea';
import { ReservaExitosaPage } from '../reserva-exitosa/reserva-exitosa';
import { FragmaPage } from '../sitios/vida-nocturna/fragma';
import { MrDrinkPage } from '../sitios/vida-nocturna/mrdrink';
import { BabarPage } from '../sitios/vida-nocturna/babar';
import { AlquimicoPage } from '../sitios/vida-nocturna/alquimico';

@Component({
  selector: 'page-vida-nocturna',
  templateUrl: 'vida-nocturna.html'
})
export class VidaNocturnaPage {
  hoy: String = new Date().toISOString();
  constructor(public navCtrl: NavController) {
  } goToReservasEnLinea(params) {
    if (!params) params = {};
    this.navCtrl.push(ReservasEnLineaPage);
  } goToReservaExitosa(params) {
    if (!params) params = {};
    this.navCtrl.push(ReservaExitosaPage);
  } goToFragma(params) {
    if (!params) params = {};
    this.navCtrl.push(FragmaPage);
  } goToMrDrink(params) {
    if (!params) params = {};
    this.navCtrl.push(MrDrinkPage);
  } goToBabar(params) {
    if (!params) params = {};
    this.navCtrl.push(BabarPage);
  } goToAlquimico(params) {
    if (!params) params = {};
    this.navCtrl.push(AlquimicoPage);
  }
}
