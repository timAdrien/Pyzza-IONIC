import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators, FormGroup, FormControl} from "@angular/forms";
import {Ingredient} from "../../app/model/ingredient";
import {FunctionService} from "../../app/service/function.service";
import {IngredientService} from "../../app/service/ingredient.service";
import * as _ from 'lodash';

/**
 * Generated class for the DetailIngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-ingredient',
  templateUrl: 'detail-ingredient.html',
})
export class DetailIngredientPage {

  ingredientForm : FormGroup;
  ingredient: Ingredient;
  ingredientBefore: Ingredient;
  edition: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ingredientService: IngredientService,
              public events: Events,
              private functionService: FunctionService) {
    this.ingredientForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prix: new FormControl('', [Validators.required, Validators.min(0),  Validators.max(10)]),
      poids: new FormControl('', [Validators.required, Validators.min(0)])
    });

    this.ingredient = this.navParams.get('ingredient');
    if(this.ingredient) {
      this.edition = true;
      let ingredientB = JSON.stringify(this.navParams.get('ingredient'));
      this.ingredientBefore = JSON.parse(ingredientB);
      this.ingredientForm.patchValue(this.ingredient);
    } else {
      this.ingredient = new Ingredient();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailIngredientPage');
  }

  /* Début */
  onSubmit() {
    let ingredientFromForm = this.prepareSaveIngredient();
    if (!this.edition) {
      this.ingredientService.post(ingredientFromForm).subscribe(ingredientAdded => {
        this.ingredientService.refresh();
        this.events.publish('ingredient:created', ingredientAdded);
        this.navCtrl.pop();
      }, error => {
        this.functionService.presentToast("Erreur dans la création de l'ingredient")
      });
    } else {
      if(!_.isEqual(ingredientFromForm, this.ingredientBefore)){
        let IngredientGoingToBeUpdate = this.functionService.getDiff(this.ingredientBefore, ingredientFromForm);
        this.ingredientService.update(IngredientGoingToBeUpdate).subscribe(ingredientUpdated => {
          this.ingredientService.refresh();
          this.events.publish('ingredient:updated', ingredientUpdated);
          this.navCtrl.pop();
        }, error => {
          this.functionService.presentToast("Erreur dans la création de l'ingredient")
        });
      } else {
        console.log("La Ingredient n'a pas changée");
      }
    }
  }
  /* Fin */

  prepareSaveIngredient(): Ingredient {
    const formModel = this.ingredientForm.value;
    let id: string;

    id = this.ingredient._id ? this.ingredient._id : null;

    const saveIngredient: Ingredient = {
      _id: id,
      nom: formModel.nom as string,
      prix: formModel.prix as number,
      poids: formModel.poids as number,
    };

    return saveIngredient;
  }
}
