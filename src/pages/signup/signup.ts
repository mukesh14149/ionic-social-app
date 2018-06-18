import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';

import { FormGroup, FormControl, Validators, FormBuilder }
from '@angular/forms';



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
  signupForm:FormGroup;
  username = new FormControl("", Validators.required);
  password =  new FormControl("", [Validators.required, Validators.minLength(8)]);
  mobile = new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);


  constructor(private fb:FormBuilder, private menu:MenuController, private dataprovider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.createForm();
  }

   ionViewWillEnter(){
     this.menu.enable(false);
   }

   createForm() {
       this.signupForm = this.fb.group({
         "username": this.username,
          "password" : this.password,
          "mobile" : this.mobile,
       });
     }

  storeinfo(){
    this.dataprovider.adduser({username:this.username.value,password:this.password.value,mobile:this.mobile.value});
    this.navCtrl.push(HomePage);
  }



}
