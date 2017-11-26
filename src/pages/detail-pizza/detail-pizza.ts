import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {FunctionService} from "../../app/service/function.service";
import {PizzaService} from "../../app/service/pizza.service";
import * as _ from 'lodash';
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

  pizza: Pizza;
  pizzaBefore: Pizza;
  selectedIngredients: string[];
  ingredients: Ingredient[];
  edition: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private functionService: FunctionService,
              private pizzaService: PizzaService,
              private ingredientService: IngredientService,
              public events: Events,
              private camera: Camera) {
    this.pizza = this.navParams.get('pizza');
    if(this.pizza) {
      this.edition = true;
      let pizzaB = JSON.stringify(this.navParams.get('pizza'));
      this.pizzaBefore = JSON.parse(pizzaB);
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
    this.pizza = this.prepareSavePizza(this.pizza);
    if(!this.edition){
      this.functionService.presentLoadingDefault();
      this.pizzaService.post(this.pizza).subscribe(pizzaUpdated => {

        this.functionService.dissmissLoadingDefault();

        this.functionService.presentToast("Pizza créée");
        this.pizzaService.refresh();

        this.events.publish('pizza:created', pizzaUpdated);
        location.reload();
      }, error => {
        console.log(error)
      });
    } else {
      if (!_.isEqual(this.pizza, this.pizzaBefore)) {
        let PizzaGoingToBeUpdate = this.functionService.getDiff(this.pizzaBefore, this.pizza);
        this.functionService.presentLoadingDefault();
        this.pizzaService.update(PizzaGoingToBeUpdate).subscribe(pizzaUpdated => {
          this.functionService.dissmissLoadingDefault();
          this.pizzaService.getAll();
          this.pizzaService.refresh();
          this.events.publish('pizza:updated', pizzaUpdated);
          location.reload();
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
    this.functionService.presentLoadingDefault();
    this.ingredientService.getAll().subscribe(ingredients => {
      this.functionService.dissmissLoadingDefault();
      this.ingredients = ingredients;
      this.setSelectedValues();
    }, error => {
      console.log(error);
    });
  }

  setSelectedValues() {
    let pizza = this.pizza;
    let selectedIngredients = this.selectedIngredients;
    if(pizza.ingredient_ids == undefined){
      pizza.ingredient_ids = [];
    }
    this.ingredients.forEach(function (ingredient) {
        if (pizza.ingredient_ids.find(ing => ing._id == ingredient._id)) {
          selectedIngredients.push(ingredient._id);
        }
    });

  }
}
