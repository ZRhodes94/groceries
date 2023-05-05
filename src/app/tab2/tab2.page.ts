import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private toastController: ToastController, private alertController: AlertController) {}

  async takePicture(item: { name: string, rating: number, review: string, src: any}) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    var imageUrl = image.webPath;
    item.src = imageUrl;
  };
  
  async presentToast(position: 'top' | 'middle' | 'bottom', index: number) {
    const toast = await this.toastController.create({
      message:  'Review Deleted',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  items: { name: string, rating:number, review: string, src: any }[] = [];

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Add Review',
      subHeader: 'Input cigar name, rating, and review.',
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
          placeholder: 'Cigar name'
        },
        {
          name: 'rating',
          type:'number',
          placeholder: 'Cigar rating (0-100)',
          min: 0,
          max: 100,
        },
        {
          name: "review",
          type: 'textarea',
          placeholder: 'Describe your cigar experience...'
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

  async shareItem(item: { name: string, rating: number, review: string }, index: number) {
    await Share.share({
      title: 'Cigar review Shared',
      text: "Review of " + this.items[index].name + " has been shared.",
      dialogTitle: 'Shared via Clash of Cigars App',
    });
    
  };


  async editItem (item: { name: string, rating: number, review: string }, index: number) {
    const alert = await this.alertController.create({
      header: 'Edit Item',
      subHeader: 'Edit name and/or review.',
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
          name: 'rating',
          placeholder: 'Rating',
          value: item.rating
        },
        {
          name: 'review',
          placeholder: 'Review',
          value: item.review
        },
      ],
    });

    await alert.present();
  };

};