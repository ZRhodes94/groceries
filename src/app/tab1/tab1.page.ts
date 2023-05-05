import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private toastController: ToastController, private alertController: AlertController) {}

  async presentToast(position: 'top' | 'middle' | 'bottom', index: number) {
    const toast = await this.toastController.create({
      message:  this.items[index].name + " " + 'removed.',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  items: { name: string, quantity: number }[] = [];

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add Item',
      subHeader: 'Input name and quantity.',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ],
      
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
    });

    await alert.present();
  };

  async removeItem(index: number) {
    console.log("Index" + " " + index + " removed.");
    this.presentToast('middle', index);
    this.items.splice(index, 1);
  };

  async shareItem(item: { name: string, quantity: number }, index: number) {
    await Share.share({
      title: 'Grocery Item Shared',
      text: this.items[index].name + "has been shared.",
      dialogTitle: 'Shared via Groceries App',
    });
    
  };

  async addInventory(item: { name: string, quantity: number }, slidingItem: any) {
      item.quantity ++;
      slidingItem.close();
  };

  async removeInventory(item: { name: string, quantity: number }, index:number, slidingItem: any) {
    item.quantity --;
    slidingItem.close();

    if (item.quantity===0) {
      this.removeItem(index);
        };
 };

  async editItem (item: { name: string, quantity: number }, index: number) {
    const alert = await this.alertController.create({
      header: 'Edit Item',
      subHeader: 'Edit name and/or quantity.',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items[index] = item;
          }
        }
      ],
      
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
    });

    await alert.present();
  }

};