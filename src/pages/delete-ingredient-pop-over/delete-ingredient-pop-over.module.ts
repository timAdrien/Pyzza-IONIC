import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteIngredientPopOverPage } from './delete-ingredient-pop-over';

@NgModule({
  declarations: [
    DeleteIngredientPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteIngredientPopOverPage),
  ],
})
export class DeleteIngredientPopOverPageModule {}
