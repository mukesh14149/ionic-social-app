import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //Getting error while passing as object
  username:string;
  mobile:number;
  password:string;
  constructor(private menu:MenuController, private dataprovider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {}

   ionViewWillEnter(){
     this.menu.enable(false);
   }

  storeinfo(){
    this.dataprovider.adduser({username:this.username,password:this.password,mobile:this.mobile});
    this.navCtrl.push(HomePage);
  }



}
