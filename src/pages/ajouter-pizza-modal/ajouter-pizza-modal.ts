import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PizzaService} from "../../app/service/pizza.service";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pizza} from "../../app/model/pizza";
import {HomePage} from "../home/home";

/**
 * Generated class for the AjouterPizzaModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-pizza-modal',
  templateUrl: 'ajouter-pizza-modal.html',
})
export class AjouterPizzaModalPage {

  pizzaForm : FormGroup;
  pizza: Pizza;
  edition: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private pizzaService: PizzaService,
              private localNotifications: LocalNotifications,
              public events: Events) {
    this.pizzaForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [''],
      description: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterPizzaModalPage');
  }


  onSubmit(){
    let pizzaFromForm = this.prepareSavePizza();
      //this.spinnerService.show('loader');
      this.pizzaService.post(pizzaFromForm).subscribe(pizzaUpdated => {
        //this.spinnerService.hide('loader');
        this.localNotifications.schedule({
          id: 1,
          text: 'Pizza créée'
        });

        this.events.publish('pizza:created', pizzaUpdated);
        this.navCtrl.push(HomePage);
      }, error => {
        console.log(error)
      });
  }

  prepareSavePizza(): Pizza {
    const formModel = this.pizzaForm.value;

    const savePizza: Pizza = {
      _id: null,
      nom: formModel.nom as string,
      prix: formModel.prix as number,
      ingredient_ids: null,
      photo: {data: null, contentType: null},
      description: formModel.description as string,
    };

    return savePizza;
  }
}
