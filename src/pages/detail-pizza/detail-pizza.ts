import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FunctionService} from "../../app/service/function.service";
import {PizzaService} from "../../app/service/pizza.service";
import * as _ from 'lodash';
import {LocalNotifications} from "@ionic-native/local-notifications";
import {HomePage} from "../home/home";
import {Camera, CameraOptions} from "@ionic-native/camera";

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
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private functionService: FunctionService,
              private pizzaService: PizzaService,
              private localNotifications: LocalNotifications,
              public events: Events,
              private camera: Camera) {
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

  onGetPhoto(imgBase64) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image)
    }, (err) => {
    });
  }

  onSubmit(){
    let pizzaFromForm = this.prepareSavePizza();
    if(!_.isEqual(pizzaFromForm, this.pizzaBefore)){
      let PizzaGoingToBeUpdate = this.functionService.getDiff(this.pizzaBefore, pizzaFromForm);
      //this.spinnerService.show('loader');
      this.pizzaService.update(PizzaGoingToBeUpdate).subscribe(pizzaUpdated => {
        //this.spinnerService.hide('loader');

        this.localNotifications.schedule({
          id: 1,
          text: 'Pizza mise à jour'
        });

        this.events.publish('pizza:updated', pizzaUpdated);
        this.navCtrl.push(HomePage);
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
      description: formModel.description as string,
    };

    return savePizza;
  }
}
