import { Injectable } from '@angular/core';
import { User } from '../../app/model/user';
import { Item } from '../../app/model/item';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private allusers:User[] = [];
  private items:Item[] = [];
  private cart:Item[] = [];
  private currentuser:User = {
    username: "",
    password:"",
    mobile : 33
  };

  constructor(private storage: Storage){
  //  console.log("DataProvider Constructor called");
    this.storage.get('allusers').then((allusers) => {
      this.allusers = allusers == null ? [] : allusers;
  //    console.log('alluser in constructor', this.allusers);

    });
    this.storage.get('items').then((items) => {
      this.items = items == null ? [] : items;
  //    console.log('items in constructor', this.items);

    });

  }

  resetValues(){
//    console.log("called resetValues");
  //  console.log(this.currentuser);
    this.getcurrentuser().then((currentuser) => {
  //    console.log("currentuser in resetValues");
      if(currentuser!=null)
        this.currentuser = currentuser
    //    console.log(this.currentuser);

      }
    );
//    console.log(this.currentuser);
    if(this.currentuser.username !=""){
      this.storage.get(this.currentuser.username).then((cart) => {
        this.cart = cart == null ? [] : cart;
    //    console.log('cart in constructor', this.cart);

      });
    }
  }

  adduser(user:User){
  //  this.storage.remove('allusers');
  //  console.log("removed key");
  //  console.log("called adduser");
  //  console.log(this.allusers);
    //this.users.push(user);
    // set a key/value
    this.allusers.push(user);
    //console.log(this.allusers.length);
    //for(let i=0;i<this.allusers.length;i++)
      //console.log(this.allusers[i].username);


    this.storage.set('allusers',this.allusers);
    this.storage.set('currentuser',user);
    this.currentuser = user;
    //console.log(this.storage.get('allusers'));

  }

  addItems(item:Item){
  //  console.log("called addItems!!");
  //  console.log(this.items);
    this.items.push(item);
    this.storage.set('items',this.items);
  }

  getalluser(){
  //  console.log("called getalluser");
    return this.storage.get('allusers').then((allusers) => {
      this.allusers = allusers == null ? [] : allusers;
  //    console.log('alluser in getalluser', this.allusers);
      return this.allusers;
    });

  }

  getallitems(){
//    console.log("called getallitems");
    return this.storage.get('items').then((items) => {
      return items;
    });
  }



  setcurrentuser(user){
    this.storage.set('currentuser',user);
    this.currentuser = user;
  }

  getcurrentuser(){
  //  console.log("called currentuser");
    return this.storage.get('currentuser').then((currentuser) => {
      this.currentuser = currentuser;
      return currentuser;
    });
  }

  addIteminCart(item){

  //  console.log("push item to cart");
  //  console.log(this.cart);
  //  console.log("checkkkkkkkkkkkkk"+this.currentuser.username);

    this.cart.push(item);
    console.log(this.cart);
    this.storage.set(this.currentuser.username,this.cart);
    //this.getCart().then((cart) => {
    //  console.log("ssssss");
    //  console.log(cart)
    //  console.log("eeeeeeeee");

    //});
  }

  removeIteminCart(item){
    this.cart.splice(this.cart.indexOf(item), 1 );
    this.storage.set(this.currentuser.username,this.cart);
  }

  logout(){
    this.storage.remove('currentuser');

  }

  getuserinfo(username, password){
  //    console.log("called getuserinfo");
      for(let i=0;i<this.allusers.length;i++)
      {
        if(this.allusers[i].username == username && this.allusers[i].password == password){
    //        console.log(this.allusers[i].username);
            return this.allusers[i];
        }

      }
      return null;

  }


  getCart(){
  //  console.log("called getCart");
  //  console.log(this.currentuser);
  //  console.log("called getCart");

    return this.storage.get(this.currentuser.username).then((cart) => {
      return cart;
    });
  }

}
