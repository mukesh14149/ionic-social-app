import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { MenuController, ViewController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private viewCtrl:ViewController, public menu:MenuController, public navCtrl: NavController, public navParams: NavParams) {

  }

   ionViewWillEnter() {
     this.menu.enable(false);
     this.viewCtrl.showBackButton(false);

   }



  onLogin(){
    //  console.log("login");

      this.navCtrl.push(LoginPage);
  }

  onSignUp(){
  //  console.log("signup");
    this.navCtrl.push(SignupPage);
  }

}
