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


  constructor(private fb:FormBuilder, private menu:MenuController, private dataprovider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.createForm();
  }

   ionViewWillEnter(){
     this.menu.enable(false);
   }

   createForm() {
       this.signupForm = this.fb.group({
         username: ['', Validators.required ],
         password : ["", [Validators.required, Validators.minLength(8)]],
         mobile : ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
       });
     }

  storeinfo(){
    console.log(this.signupForm.get('username').value)
    this.dataprovider.adduser({username:this.signupForm.get('username').value,
    password:this.signupForm.get('password').value,mobile:this.signupForm.get('mobile').value});
    this.navCtrl.push(HomePage);
  }



}
