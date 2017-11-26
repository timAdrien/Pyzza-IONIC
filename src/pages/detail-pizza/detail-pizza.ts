import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FunctionService} from "../../app/service/function.service";
import {PizzaService} from "../../app/service/pizza.service";
import * as _ from 'lodash';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Ingredient} from "../../app/model/ingredient";
import {IngredientService} from "../../app/service/ingredient.service";

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
  selectedIngredients: string[];
  ingredients: Ingredient[];
  edition: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private functionService: FunctionService,
              private pizzaService: PizzaService,
              private ingredientService: IngredientService,
              private localNotifications: LocalNotifications,
              public events: Events,
              private camera: Camera) {
    this.pizzaForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [''],
      description: [''],
    });
    this.pizza = navParams.get('pizza');
    if(this.pizza) {
      this.edition = true;
      let pizzaB = JSON.stringify(navParams.get('pizza'));
      this.pizzaBefore = JSON.parse(pizzaB);
      this.pizzaForm.patchValue(this.pizza);
    } else {
      this.pizza = new Pizza('','','', '', {data: '', contentType: ''});
    }
    this.selectedIngredients = [];
    this.getIngredients();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPizzaPage');
  }

  onGetPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.pizza.photo.data = imageData;
      this.pizza.photo.contentType = "image/png";
    }, (err) => {
    });
  }

  onSubmit(){
    //let pizzaFromForm = this.prepareSavePizza();

    console.log(this.selectedIngredients);
    this.pizza = this.prepareSavePizza(this.pizza);
    console.log(this.pizza);
    if(!this.edition){
      this.pizzaService.post(this.pizza).subscribe(pizzaUpdated => {
        //this.spinnerService.hide('loader');
        this.localNotifications.schedule({
          id: 1,
          text: 'Pizza créée'
        });

        this.events.publish('pizza:created', pizzaUpdated);

        this.navCtrl.pop();
      }, error => {
        console.log(error)
      });
    } else {
      if (!_.isEqual(this.pizza, this.pizzaBefore)) {
        let PizzaGoingToBeUpdate = this.functionService.getDiff(this.pizzaBefore, this.pizza);
        //this.spinnerService.show('loader');
        this.pizzaService.update(PizzaGoingToBeUpdate).subscribe(pizzaUpdated => {
          //this.spinnerService.hide('loader');

          this.localNotifications.schedule({
            id: 1,
            text: 'Pizza mise à jour'
          });

          this.events.publish('pizza:updated', pizzaUpdated);

          this.navCtrl.pop();
        }, error => {
          console.log(error)
        });
      } else {
        console.log("La Ingredient n'a pas changée");
      }
    }
  }


  prepareSavePizza(pizza): Pizza {

    let ingredients = this.ingredients;
    pizza.ingredient_ids = [];
    this.selectedIngredients.forEach(function (ingredientId) {
      if(pizza.ingredient_ids == undefined){
        pizza.ingredient_ids = [];
      }
        pizza.ingredient_ids.push(ingredients.find(ing => ing._id == ingredientId));
    });

    return pizza;
  }


  getIngredients() {
    this.ingredientService.getAll().subscribe(ingredients => {
      this.ingredients = ingredients;
      this.setSelectedValues();
    }, error => {
      console.log(error);
    });
  }

  setSelectedValues() {
    let pizza = this.pizza;
    let selectedIngredients = this.selectedIngredients;
    this.ingredients.forEach(function (ingredient) {
      if(pizza.ingredient_ids == undefined){
        pizza.ingredient_ids = [];
      }
        if (pizza.ingredient_ids.find(ing => ing._id == ingredient._id)) {
          selectedIngredients.push(ingredient._id);
        }
    });

  }
}
