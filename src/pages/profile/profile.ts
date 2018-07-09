import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  currentuser = {
    username:"",
    mobile:999999999
  };
  constructor(private dataprovider:DataProvider, public navCtrl: NavController, private menu:MenuController) {
    this.dataprovider.getcurrentuser().then((currentuser) => {
      this.currentuser = currentuser;
      console.log(this.currentuser);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter(){
    this.menu.close();
  }

  open(){
    this.navCtrl.popToRoot();
  }

}
