import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { NativeStorage } from 'ionic-native';
import { InicioDeSesionPage } from '../inicio-de-sesion/inicio-de-sesion';
import { CategoriasPage } from '../categorias/categorias';
import { RegistroPage } from '../registro/registro';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {
  }

  // ionViewDidLoad() {
  //   NativeStorage.remove('user');
  // }

  // ionViewWillEnter() {
  //   NativeStorage.remove('user');
  // }

  goToInicioDeSesion(params) {
    if (!params) params = {};
    this.navCtrl.push(InicioDeSesionPage);
  } goToRegistro(params) {
    if (!params) params = {};
    this.navCtrl.push(RegistroPage);
  }
}
