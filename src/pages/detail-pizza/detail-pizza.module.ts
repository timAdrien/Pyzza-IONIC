import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPizzaPage } from './detail-pizza';

@NgModule({
  declarations: [
    DetailPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPizzaPage),
  ],
})
export class DetailPizzaPageModule {}
