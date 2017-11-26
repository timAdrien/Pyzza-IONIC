import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterPizzaModalPage } from './ajouter-pizza-modal';

@NgModule({
  declarations: [
    AjouterPizzaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterPizzaModalPage),
  ],
})
export class AjouterPizzaModalPageModule {}
