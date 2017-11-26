import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailIngredientPage } from './detail-ingredient';

@NgModule({
  declarations: [
    DetailIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailIngredientPage),
  ],
})
export class DetailIngredientPageModule {}
