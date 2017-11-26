import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {PizzaService} from "../../app/service/pizza.service";
import {LocalNotifications} from "@ionic-native/local-notifications";

/**
 * Generated class for the DeletePizzaPopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-pizza-pop-over',
  templateUrl: 'delete-pizza-pop-over.html',
})
export class DeletePizzaPopOverPage {

  pizza: Pizza;
  constructor(public navCtrl: NavController, public navParams: NavParams,
                private pizzaService: PizzaService,
                private localNotifications: LocalNotifications,
                public events: Events,
                public viewCtrl: ViewController) {
    this.pizza = navParams.get('pizza');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePizzaPopOverPage');
  }

  supprimerPizza(){
    this.pizzaService.delete(this.pizza._id).subscribe(() => {
      this.events.publish('pizza:deleted', this.pizza);

      this.localNotifications.schedule({
        id: 2,
        text: 'Pizza supprimée'
      });

      this.viewCtrl.dismiss();
    }, error => {
      console.log(error)
    });
  }
}
