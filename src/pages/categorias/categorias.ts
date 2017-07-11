import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { VidaNocturnaPage } from '../sitios/vida-nocturna';
import { RestaurantesPage } from '../sitios/restaurantes';
import { PlanesCulturalesPage } from '../sitios/planes-culturales';
import { ShoppingPage } from '../sitios/shopping';
import { WelcomePage } from '../welcome/welcome';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {

  }

  paginas: any[] = [
    { titulo: 'Cerrar Sesión', component: WelcomePage }
  ]

  goToVidaNocturna(params) {
    if (!params) params = {};
    this.navCtrl.push(VidaNocturnaPage);
  }
  goToRestaurantes(params) {
    if (!params) params = {};
    this.navCtrl.push(RestaurantesPage);
  }
  goToPlanesCulturales(params) {
    if (!params) params = {};
    this.navCtrl.push(PlanesCulturalesPage);
  }
  goToShopping(params) {
    if (!params) params = {};
    this.navCtrl.push(ShoppingPage);
  }
}
