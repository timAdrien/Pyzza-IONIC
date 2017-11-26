import { Component } from '@angular/core';
import { NavController, PopoverController} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {PizzaService} from "../../app/service/pizza.service";
import {DetailPizzaPage} from "../detail-pizza/detail-pizza";
import { Events } from 'ionic-angular';
import {DeletePizzaPopOverPage} from "../delete-pizza-pop-over/delete-pizza-pop-over";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {FunctionService} from "../../app/service/function.service";

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
  onRefresh = false;

  constructor(public navCtrl: NavController, private pizzaService: PizzaService, public events: Events,
              public popoverCtrl: PopoverController,
              private localNotifications: LocalNotifications,
              private functionService: FunctionService) {
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
    });

    this.pizzaService.onRefresh().subscribe(() => {
      this.onRefresh = true;
      this.getPizzas();
    }, error => {
      this.errorMessage = <any>error;
    });

    this.getPizzas();
  }




  /* Début Appels Services */
  getPizzas(): void {
    this.functionService.presentLoadingDefault();
    this.pizzaService.getAll().subscribe(pizzas => {
      this.functionService.dissmissLoadingDefault();
      this.pizzas = pizzas;

      if (this.onRefresh) {
        this.localNotifications.schedule({
          id: 1,
          text: 'Mise à jour de vos pizzas'
        });
        this.onRefresh = false;
      }
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
