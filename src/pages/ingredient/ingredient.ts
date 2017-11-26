import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {IngredientService} from "../../app/service/ingredient.service";
import {Ingredient} from "../../app/model/ingredient";
import {DetailIngredientPage} from "../detail-ingredient/detail-ingredient";
import {DeleteIngredientPopOverPage} from "../delete-ingredient-pop-over/delete-ingredient-pop-over";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ingredientService: IngredientService,
              private functionService: FunctionService,
              public popoverCtrl: PopoverController) {

    this.getIngredients();
  }

  /* Début Appels Services */
  getIngredients(): void {
    //this.spinnerService.show('loader');
    this.ingredientService.getAll().subscribe(ingredients => {
      //this.spinnerService.hide('loader');
      this.ingredients = ingredients;
    }, error => {
      console.log(error)
    });
  }
  /* Fin Appels Services */

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientPage');
  }

  goToEditPage(event, pizza){
    this.navCtrl.push(DetailIngredientPage, {
      pizza: pizza
    });
  }

  goToAjouterPage(event){
    this.navCtrl.push(DetailIngredientPage);
  }

  presentPopoverDeletePizza($event, pizza) {
    let popover = this.popoverCtrl.create(DeleteIngredientPopOverPage, {
      pizza: pizza
    });
    popover.present();
  }


}
