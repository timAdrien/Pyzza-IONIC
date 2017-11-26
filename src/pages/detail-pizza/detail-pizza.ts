import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FunctionService} from "../../app/service/function.service";
import {PizzaService} from "../../app/service/pizza.service";
import * as _ from 'lodash';
import {LocalNotifications} from "@ionic-native/local-notifications";

/**
 * Generated class for the DetailPizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-pizza',
  templateUrl: 'detail-pizza.html',
})
export class DetailPizzaPage {

  pizzaForm : FormGroup;
  pizza: Pizza;
  pizzaBefore: Pizza;
  edition: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private functionService: FunctionService,
              private pizzaService: PizzaService,
              private localNotifications: LocalNotifications) {
    this.pizzaForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [''],
      description: [''],
    });
    this.pizza = navParams.get('pizza');
    this.pizzaBefore = navParams.get('pizza');

    if(this.pizza) {
      this.pizzaForm.patchValue(this.pizza);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPizzaPage');
  }

  onSubmit(){
    let pizzaFromForm = this.prepareSavePizza();
    if(!_.isEqual(pizzaFromForm, this.pizzaBefore)){
      let PizzaGoingToBeUpdate = this.functionService.getDiff(this.pizzaBefore, pizzaFromForm);
      //this.spinnerService.show('loader');
      this.pizzaService.update(PizzaGoingToBeUpdate).subscribe(pizzaUpdated => {
        //this.spinnerService.hide('loader');
        this.pizzaBefore = null;

        this.localNotifications.schedule({
          id: 1,
          text: 'Pizza updated'
        });
        // REDIRECT
      }, error => {
        console.log(error)
      });
    } else {
      console.log("La Ingredient n'a pas changée");
    }
  }


  prepareSavePizza(): Pizza {
    const formModel = this.pizzaForm.value;

    let id: string;

    id = this.pizzaBefore._id ? this.pizzaBefore._id : null;

    const savePizza: Pizza = {
      _id: id,
      nom: formModel.nom as string,
      prix: formModel.prix as number,
      ingredient_ids: null,
      photo: null,
      description: formModel.poids as string,
    };

    return savePizza;
  }
}
