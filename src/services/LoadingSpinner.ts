import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular'

@Injectable()
export class LoadingSpinner {

    constructor(public loadingCtrl: LoadingController) {
    }

    loadSpinner(param) {
        let loading = this.loadingCtrl.create({
            content: 'Espere...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, param);
    }
}