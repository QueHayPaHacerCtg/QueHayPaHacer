import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { WelcomePage } from '../pages/welcome/welcome';
import { InicioDeSesionPage } from '../pages/inicio-de-sesion/inicio-de-sesion';
import { CategoriasPage } from '../pages/categorias/categorias';
import { CercaDeMPage } from '../pages/cerca-de-m/cerca-de-m';
import { ReservaExitosaPage } from '../pages/reserva-exitosa/reserva-exitosa';
import { VidaNocturnaPage } from '../pages/vida-nocturna/vida-nocturna';
import { ReservasEnLineaPage } from '../pages/reservas-en-linea/reservas-en-linea';
import { RegistroPage } from '../pages/registro/registro';
import { TabsPage } from '../pages/tabs/tabs';

import { Settings } from '../providers/providers';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;

  @ViewChild(Nav) nav: Nav;

  paginas: any[] = [
    { titulo: 'Cerrar Sesión', component: WelcomePage }
  ]

  constructor(private translate: TranslateService, private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private nativeStorage: NativeStorage) {
    this.initTranslate();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
      env.nativeStorage.getItem('user').then(function (data) {
        // user is previously logged and we have his data
        // we will let him access the app

        // env.nav.setRoot(CategoriasPage);
        env.nav.push(TabsPage);
        env.splashScreen.hide();

      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.push(WelcomePage);
        env.splashScreen.hide();
      });

      this.statusBar.styleDefault();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  abrirPagina(pagina) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(pagina.component);
  }
}
