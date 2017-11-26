import { Component } from '@angular/core';
import {Events, IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Pizza} from "../../app/model/pizza";
import {PizzaService} from "../../app/service/pizza.service";
import {FunctionService} from "../../app/service/function.service";

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
  constructor(public navParams: NavParams,
              private pizzaService: PizzaService,
              private functionService: FunctionService,
              public events: Events,
              public viewCtrl: ViewController) {
    this.pizza = navParams.get('pizza');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePizzaPopOverPage');
  }

  supprimerPizza(){
    this.functionService.presentLoadingDefault();
    this.pizzaService.delete(this.pizza._id).subscribe(() => {
      this.functionService.dissmissLoadingDefault();
      this.events.publish('pizza:deleted', this.pizza);
      this.pizzaService.refresh();
      this.functionService.presentToast("Pizza supprimée");
      this.viewCtrl.dismiss();
    }, error => {
      console.log(error)
    });
  }
}
