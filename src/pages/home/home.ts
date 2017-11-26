import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {PizzaService} from "../../app/service/pizza.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pizzas: Pizza[];
  errorMessage: any;
  constructor(public navCtrl: NavController, private pizzaService: PizzaService) {

    this.getPizzas();
  }

  /* Début Appels Services */
  getPizzas(): void {
    //this.spinnerService.show('loader');
    this.pizzaService.getAll().subscribe(pizzas => {
      //this.spinnerService.hide('loader');
      this.pizzas = pizzas;
    }, error => {
      //this.toastr.error("Erreur de chargement des pizzas...", "Erreur", {dismiss: 'controlled'});
      this.errorMessage = <any>error;
    });
  }
  /* Fin Appels Services */

}
