import { Injectable } from '@angular/core';
import {LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class FunctionService {

  loading: any;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) { }

  getDiff(obj1, obj2){
    let newJson = { _id: obj2["_id"]};

    for(let property in obj1) {
      if (obj1[property] !=  obj2[property]) {
        newJson[property] = obj2[property];
      }
    }
    return newJson;
  }


  presentToast(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  dissmissLoadingDefault() {
    this.loading.dismiss();
  }

}
