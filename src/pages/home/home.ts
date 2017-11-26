import { Component } from '@angular/core';
import {ModalController, NavController, PopoverController} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {PizzaService} from "../../app/service/pizza.service";
import {DetailPizzaPage} from "../detail-pizza/detail-pizza";
import { Events } from 'ionic-angular';
import {DeletePizzaPopOverPage} from "../delete-pizza-pop-over/delete-pizza-pop-over";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pizzas: Pizza[];
  errorMessage: any;

  order = "nom";
  ascending = false;
  filterNom = "";

  constructor(public navCtrl: NavController, private pizzaService: PizzaService, public events: Events,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {
    events.subscribe('pizza:updated', (pizza) => {
      let indexPizza = this.pizzas.findIndex(pizzaListe => pizzaListe._id == pizza._id);
      this.pizzas[indexPizza] = pizza;
    });
    events.subscribe('pizza:deleted', (pizza) => {
      let indexPizza = this.pizzas.findIndex(pizzaListe => pizzaListe._id == pizza._id);
      if (indexPizza !== -1) {
        this.pizzas.splice(indexPizza, 1);
      }
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    events.subscribe('pizza:created', (pizza) => {
      this.pizzas.push(pizza);
    });

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

  goToEditPage(event, pizza){
    this.navCtrl.push(DetailPizzaPage, {
      pizza: pizza
    });
  }

  goToAjouterPage(event){
    this.navCtrl.push(DetailPizzaPage);
  }

  presentPopoverDeletePizza($event, pizza) {
    let popover = this.popoverCtrl.create(DeletePizzaPopOverPage, {
      pizza: pizza
    });
    popover.present();
  }
}
