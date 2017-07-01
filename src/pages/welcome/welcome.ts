import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { InicioDeSesionPage } from '../inicio-de-sesion/inicio-de-sesion';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';
import { CategoriasPage } from '../categorias/categorias';
import { RegistroPage } from '../registro/registro';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  providers: [NativeStorage]
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    NativeStorage.remove('user');
  }

  ionViewWillEnter() {
    NativeStorage.remove('user');
  }

  goToInicioDeSesion(params) {
    if (!params) params = {};
    this.navCtrl.push(InicioDeSesionPage);
  } goToCategorias(params) {
    if (!params) params = {};
    this.navCtrl.push(CategoriasPage);
  } goToCercaDeM(params) {
    if (!params) params = {};
    this.navCtrl.push(CercaDeMPage);
  } goToRegistro(params) {
    if (!params) params = {};
    this.navCtrl.push(RegistroPage);
  }
}
