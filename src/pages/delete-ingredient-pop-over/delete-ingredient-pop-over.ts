import { Component } from '@angular/core';
import {Events, IonicPage, NavParams, ViewController} from 'ionic-angular';
import {IngredientService} from "../../app/service/ingredient.service";
import {FunctionService} from "../../app/service/function.service";
import {Ingredient} from "../../app/model/ingredient";

/**
 * Generated class for the DeleteIngredientPopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-ingredient-pop-over',
  templateUrl: 'delete-ingredient-pop-over.html',
})
export class DeleteIngredientPopOverPage {

  ingredient: Ingredient;
  constructor(public navParams: NavParams,
              private ingredientService: IngredientService,
              private functionService: FunctionService,
              public events: Events,
              public viewCtrl: ViewController) {
    this.ingredient = navParams.get('ingredient');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePizzaPopOverPage');
  }

  supprimerIngredient(){
    this.functionService.presentLoadingDefault();
    this.ingredientService.delete(this.ingredient._id).subscribe(() => {
      this.functionService.dissmissLoadingDefault();
      this.events.publish('ingredient:deleted', this.ingredient);
      this.ingredientService.refresh();
      this.functionService.presentToast("Ingredient supprimée");
      this.viewCtrl.dismiss();
    }, error => {
      console.log(error)
    });
  }
}
