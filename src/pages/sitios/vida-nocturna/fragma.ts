import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { ReservasEnLineaPage } from '../reservas-en-linea/reservas-en-linea';
// import { ReservaExitosaPage } from '../reserva-exitosa/reserva-exitosa';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-fragma',
  templateUrl: 'fragma.html'
})
export class FragmaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  response: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((posicion) => {
      let inicio = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
      let final = new google.maps.LatLng(10.425371, -75.5551997);
      let directionsDisplay = new google.maps.DirectionsRenderer();
      let directionsService = new google.maps.DirectionsService();

      let mapOptions = {
        center: inicio,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var request = {
        origin: inicio,
        destination: final,
        travelMode: google.maps.TravelMode['WALKING']
      };

      directionsService.route(request, function (response, status) {
        if (status == 'OK') {
          this.response = response.routes[0].legs[0].end_address;
          directionsDisplay.setDirections(response);
        }
      });

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      directionsDisplay.setMap(this.map);
    }, (err) => {
      console.log(err);
    });

  }

  // goToReservasEnLinea(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(ReservasEnLineaPage);
  // } goToReservaExitosa(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(ReservaExitosaPage);
  // }
}
