import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { CercaDeMPage } from '../cerca-de-m/cerca-de-m';
import { WelcomePage } from '../welcome/welcome';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {
  // rootPage = CategoriasPage;

  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {
    
  }

  paginas: any[] = [
    { titulo: 'Cerrar Sesión', component: WelcomePage }
  ]

  // ionViewDidLoad() {
  //   let env = this;
  //   env.nav.setRoot(this);
  // }
  goToCercaDeM(params) {
    if (!params) params = {};
    this.navCtrl.push(CercaDeMPage);
  }
}
