import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config, AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { WelcomePage } from '../pages/welcome/welcome';
import { RegistroPage } from '../pages/registro/registro';
import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushToken } from '@ionic/cloud-angular';

import { Settings } from '../providers/providers';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = WelcomePage;
  alert: any;

  @ViewChild(Nav) nav: Nav;

  paginas: any[] = [
    { titulo: 'Cerrar Sesión', component: WelcomePage }
  ]

  constructor(private translate: TranslateService, private platform: Platform,
    settings: Settings, private config: Config, private statusBar: StatusBar,
    private splashScreen: SplashScreen, private nativeStorage: NativeStorage,
    public push: Push, private alertCtrl: AlertController) {
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

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });

      this.push.rx.notification()
        .subscribe((msg) => {
          alert(msg.title + ': ' + msg.text);
        });

      platform.registerBackButtonAction(() => {


        //uncomment this and comment code below to to show toast and exit app
        // if (this.backButtonPressedOnceToExit) {
        //   this.platform.exitApp();
        // } else if (this.nav.canGoBack()) {
        //   this.nav.pop({});
        // } else {
        //   this.showToast();
        //   this.backButtonPressedOnceToExit = true;
        //   setTimeout(() => {

        //     this.backButtonPressedOnceToExit = false;
        //   },2000)
        // }

        if (this.nav.getActive().name === 'TabsPage') {
          console.log('estoy en los tabs!');
          this.showAlert();
        } else {
          if (env.alert) {
            env.alert.dismiss();
            env.alert = null;
          } else {
            env.nav.pop();
          }
        }
      });

      this.statusBar.styleDefault();
    });
  }

  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Salir?',
      message: 'Deseas salir de la app?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: 'Salir',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
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
