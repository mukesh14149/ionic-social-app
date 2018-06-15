import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {};
  username:string;
  password:string;

  constructor(private menu:MenuController, private dataprovider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }




  checkinfo(){
      this.user = this.dataprovider.getuserinfo(this.username, this.password);
      console.log(this.user);
      if(this.user!=null){
        this.dataprovider.setcurrentuser(this.user);
        this.navCtrl.push(HomePage);
      }else{
        console.log("Login Error");
      }
  }
}
