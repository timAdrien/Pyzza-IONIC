import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, ToastController} from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {PizzaService} from "./service/pizza.service";
import {AppConfig} from "./app-config";
import {DetailPizzaPage} from "../pages/detail-pizza/detail-pizza";
import {FunctionService} from "./service/function.service";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {PipeOrderPizza} from "./pipe/pipe-order-pizza";
import {PipeFilterNomPizza} from "./pipe/pipe-filter-nom-pizza";
import {DeletePizzaPopOverPage} from "../pages/delete-pizza-pop-over/delete-pizza-pop-over";
import {IngredientService} from "./service/ingredient.service";
import {IngredientPage} from "../pages/ingredient/ingredient";
import {DetailIngredientPage} from "../pages/detail-ingredient/detail-ingredient";
import {DeleteIngredientPopOverPage} from "../pages/delete-ingredient-pop-over/delete-ingredient-pop-over";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IngredientPage,
    DetailPizzaPage,
    DetailIngredientPage,
    DeletePizzaPopOverPage,
    DeleteIngredientPopOverPage,
    PipeOrderPizza,
    PipeFilterNomPizza
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IngredientPage,
    DetailIngredientPage,
    DeletePizzaPopOverPage,
    DeleteIngredientPopOverPage,
    DetailPizzaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaService,
    IngredientService,
    AppConfig,
    FunctionService,
    LocalNotifications,
    ToastController,
    Camera
  ]
})
export class AppModule {}
