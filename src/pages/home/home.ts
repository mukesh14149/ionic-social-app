import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../app/model/user';
import { WelcomePage } from '../welcome/welcome';
import { Item } from '../../app/model/item';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  currentuser = {};
  items: Item[] = [];
  cart = [];
  cartflag = new Map();
  cartlength = 0;
  constructor(private menu:MenuController, private dataprovider: DataProvider, public navCtrl: NavController) {

    this.getItems();
    this.dataprovider.getCart().then((cart) => {
      this.cart = cart
      console.log("Here is Cart");
      console.log(this.cart);
      if(cart!=null)
      this.cartlength = this.cart.length;
    //  console.log(this.cartflag.length+"ssss"+this.cart.length);
      this.updatecartflag();
    });


  }


  ionViewWillEnter(){
    this.menu.enable(true);
    console.log("In homepage");
    this.dataprovider.getcurrentuser().then((currentuser) => this.OnCheck(currentuser));
  }

  updatecartflag(){
    console.log("In updatecartflag");

    if(this.cart!=null){
      for(let i=0;i<this.cart.length;i++)
      {
          this.cartflag.set(this.cart[i].itemname,true);
          //console.log(this.cart[i])
          //console.log(this.cartflag);
      }
    }
    console.log(this.cartflag);
  }


  OnCheck(currentuser){
    console.log("OnCheck");
    console.log(currentuser);
    if(currentuser==null){
      this.navCtrl.push(WelcomePage);
    }
  }

  changeCart(index){
      console.log("called addToCar"+index);
      console.log(this.cartflag.get(this.items[index].itemname));
      if(!this.cartflag.get(this.items[index].itemname)){
        console.log("Turn to True");
        //console.log(this.items[index]);
        //console.log(this.cartflag.get(this.items[index]));
        this.dataprovider.addIteminCart(this.items[index]); //add item in db cart
        this.cart.push(this.items[index]); //add item in temp array cart
        this.updatecartflag();
      }else{
        console.log("Turn to False");
        console.log(this.cart);
        console.log(this.items[index]);
        console.log(this.cart[0]);
        let temp_index = this.cart.findIndex(obj => obj['itemname'] === this.items[index].itemname);


        //this.cart.indexOf(this.items[index]) get the index in cart where that particular item stored
        this.cartflag.set(this.cart[temp_index].itemname,false);
        this.dataprovider.removeIteminCart(this.items[index]);  //remove item from db
        console.log(this.cart);
        this.cart.splice(temp_index, 1); //remove item from temp array cart
        console.log(this.cart);
        this.updatecartflag();
      }
      this.cartlength = this.cart.length;
      console.log("cartlenght"+this.cartlength);
  }

  getItems(){
    console.log("called getItems");
    //this.dataprovider.addItems({  itemname:"item2", imgsrc:"img2"});

      this.dataprovider.getallitems().then((items) => {
        //console.log("in  getItems");
        this.items = items;
        for(let i=0;i<this.items.length;i++)
          this.cartflag.set(this.items[i].itemname,false);
          console.log(this.cartflag);
      }).catch(function(error) {
            console.log(error);
        });
  }


}
