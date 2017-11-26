import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, ModalController} from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

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
import {AjouterPizzaModalPage} from "../pages/ajouter-pizza-modal/ajouter-pizza-modal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPizzaPage,
    DeletePizzaPopOverPage,
    AjouterPizzaModalPage,
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
    ListPage,
    DeletePizzaPopOverPage,
    DetailPizzaPage,
    AjouterPizzaModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaService,
    AppConfig,
    FunctionService,
    LocalNotifications
  ]
})
export class AppModule {}
