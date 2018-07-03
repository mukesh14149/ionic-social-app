import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';

import { FormGroup, FormControl, Validators, FormBuilder }
from '@angular/forms';

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
  //username:string;
  //password:string;
  loginForm:FormGroup;

constructor(private fb: FormBuilder, private menu:MenuController, private dataprovider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.createForm();
}

createForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password : ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }




  checkinfo(){
      this.dataprovider.getuserinfo(this.loginForm.get('username').value, this.loginForm.get('password').value).then((data) =>{
          console.log("Inffoo checking");
          console.log(data);
          if(data!=null){
            this.dataprovider.setcurrentuser(data);
            this.navCtrl.push(HomePage);
          }else{
            console.log("Login Error");
          }
      });

  }
}
