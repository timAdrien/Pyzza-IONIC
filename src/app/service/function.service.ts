import { Injectable } from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class FunctionService {

  constructor(
    private toastCtrl: ToastController) { }

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

}
