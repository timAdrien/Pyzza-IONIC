import { Component } from '@angular/core';
import {Events, IonicPage, NavController, PopoverController} from 'ionic-angular';
import {IngredientService} from "../../app/service/ingredient.service";
import {Ingredient} from "../../app/model/ingredient";
import {DetailIngredientPage} from "../detail-ingredient/detail-ingredient";
import {DeleteIngredientPopOverPage} from "../delete-ingredient-pop-over/delete-ingredient-pop-over";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {FunctionService} from "../../app/service/function.service";

/**
 * Generated class for the IngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredient',
  templateUrl: 'ingredient.html',
})
export class IngredientPage {

  ingredients: Ingredient[];
  onRefresh: boolean;

  constructor(public navCtrl: NavController,
              private ingredientService: IngredientService,
              public popoverCtrl: PopoverController,
              public events: Events,
              private localNotifications: LocalNotifications,
              private functionService: FunctionService) {

    events.subscribe('ingredient:updated', (pizza) => {
      let indexPizza = this.ingredients.findIndex(pizzaListe => pizzaListe._id == pizza._id);
      this.ingredients[indexPizza] = pizza;
    });
    events.subscribe('ingredient:deleted', (pizza) => {
      let indexPizza = this.ingredients.findIndex(pizzaListe => pizzaListe._id == pizza._id);
      if (indexPizza !== -1) {
        this.ingredients.splice(indexPizza, 1);
      }
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    events.subscribe('ingredient:created', (pizza) => {
      this.ingredients.push(pizza);
    });

    this.ingredientService.onRefresh().subscribe(() => {
      this.onRefresh = true;
      this.getIngredients();
    }, error => {
      console.log(error);
    });

    this.getIngredients();
  }

  /* Début Appels Services */
  getIngredients(): void {
    this.functionService.presentLoadingDefault();
    this.ingredientService.getAll().subscribe(ingredients => {
      this.functionService.dissmissLoadingDefault();
      this.ingredients = ingredients;

      if (this.onRefresh) {
        this.localNotifications.schedule({
          id: 1,
          text: 'Mise à jour de vos pizzas'
        });
        this.onRefresh = false;
      }
    }, error => {
      console.log(error)
    });
  }
  /* Fin Appels Services */

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientPage');
  }

  goToEditPage(event, ingredient){
    this.navCtrl.push(DetailIngredientPage, {
      ingredient: ingredient
    });
  }

  goToAjouterPage(event){
    this.navCtrl.push(DetailIngredientPage);
  }

  presentPopoverDeletePizza($event, ingredient) {
    let popover = this.popoverCtrl.create(DeleteIngredientPopOverPage, {
      ingredient: ingredient
    });
    popover.present();
  }


}
