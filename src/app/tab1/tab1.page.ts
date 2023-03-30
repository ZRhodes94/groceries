import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private toastController: ToastController) {}

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Item removed.',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  items = [
    {
      name: "Milk",
      quantity: 2    
    },
    {
      name: "Bread",
      quantity: 1    
    },
    {
      name: "Banana",
      quantity: 3    
    },
    {
      name: "Sugar",
      quantity: 1    
    },
  ];
}