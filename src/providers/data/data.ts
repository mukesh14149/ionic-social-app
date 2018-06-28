import { Injectable } from '@angular/core';
import { User } from '../../app/model/user';
import { Item } from '../../app/model/item';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';

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

  constructor(private http: HTTP, private storage: Storage){
  //  console.log("DataProvider Constructor called");
    this.getalluser().then((allusers) => {
      this.allusers = allusers == null ? [] : allusers;
  //    console.log('alluser in constructor', this.allusers);
    });

    this.getallitems().then((items) => {
      this.items = items == null ? [] : items;
    });

  }

  resetValues(){
    console.log("called resetValues");
  //  console.log(this.currentuser);
    this.getcurrentuser().then((currentuser) => {
  //    console.log("currentuser in resetValues");
      if(currentuser!=null)
        this.currentuser = currentuser
        console.log("I called currentuser");
        console.log(this.currentuser.username);
        if(this.currentuser.username !=""){
          this.getItemsinCart();
        }
    //    console.log(this.currentuser);

      }
    );


  }
  getItemsinCart(){
    console.log("Called getItemsinCart");
    let body = {
      "currentuser": this.currentuser.username
    };
    return this.http.post('http://localhost:8080/getItemsinCart',body,{}).then(data =>
    {
          console.log("getItemsinCart");
          console.log(JSON.parse(data.data));
          this.cart = JSON.parse(data.data) == null ? [] : JSON.parse(data.data);
          console.log(this.cart);
          return this.cart;
    });
    // this.storage.get(this.currentuser.username).then((cart) => {
    //   this.cart = cart == null ? [] : cart;
    // });
  }
  adduser(user:User){
  //  this.storage.remove('allusers');
  //  console.log("removed key");
  //  console.log("called adduser");
  //  console.log(this.allusers);
    //this.users.push(user);
    // set a key/value
    this.allusers.push(user);
    this.setcurrentuser(user);

    //console.log(this.allusers.length);
    //for(let i=0;i<this.allusers.length;i++)
      //console.log(this.allusers[i].username);

    let header = new Headers();
    header.append( 'Content-Type','application/json' );
    let body = {
      "allusers": JSON.stringify(this.allusers)
    };
    console.log("{ 'Content-Type' : 'application/json'}");
    this.http.post('http://localhost:8080/setAllUsers',body,{}).then(data =>
    {
          console.log("set alluser");
          console.log(data.data);

    });
  //  this.storage.set('allusers',this.allusers);
  //  this.storage.set('currentuser',user);
  //  this.currentuser = user;
    //console.log(this.storage.get('allusers'));

  }

  addItems(item:Item){
  //  console.log("called addItems!!");
  //  console.log(this.items);
    this.items.push(item);
    this.storage.set('items',this.items);
  }

  getalluser(){

        let header = new Headers();
        header.append( 'Content-Type','application/json' );
        let body = {
          user: "Mukesh"
        };
        console.log("{ 'Content-Type' : 'application/json'}");
        return this.http.post('http://localhost:8080/getAllUsers',body,{}).then(data =>
        {
            console.log(JSON.parse(data.data));
            return JSON.parse(data.data);
        });
          // console.log("called getalluser");
          //   return this.storage.get('allusers').then((allusers) => {
          //     console.log('alluser in getalluser', allusers);
          //     return allusers;
          //   });
  }

  getallitems(){
    console.log("called getallitems");
    return this.http.get('http://localhost:8080/getItems', {}, {})
      .then(data => {
        console.log(data.status);
        console.log(JSON.parse(data.data)); // data received by server
        console.log(data.headers);
        return JSON.parse(data.data);
     })
     .catch(error => {
       console.log(error.status);
       console.log(error.error); // error message as string
       console.log(error.headers);
     });

     // return this.storage.get('items').then((items) => {
     //   cuseronsole.log("fetch items");
     //   console.log(items);
     //   return items;
     // });
  }



  setcurrentuser(user){
  //  this.storage.set('currentuser',user);
    this.currentuser = user;
    console.log("called setcurrentuser11");
    console.log(this.currentuser);
    let header = new Headers();
    header.append( 'Content-Type','application/json' );
    let body = {
      "user": JSON.stringify(this.currentuser)
    };
    console.log(body);
    console.log("{ 'Content-Type' : 'application/json'}");
    this.http.post('http://localhost:8080/setCurrentUser',body,{}).then(data =>
    {
        console.log("set currentuser")
        console.log(data.data);
    });
  }

  getcurrentuser(){
    console.log("called currentuser11");
    let header = new Headers();
    header.append( 'Content-Type','application/json' );
    let body = {
      user: "Mukesh"
    };
    console.log("{ 'Content-Type' : 'application/json'}");
    return this.http.post('http://localhost:8080/getCurrentUser',body,{}).then(data =>
    {
        console.log(JSON.parse(data.data));
        return JSON.parse(data.data);
    });
    // return this.storage.get('currentuser').then((currentuser) => {
    //   console.log(currentuser);
    //   this.currentuser = currentuser;
    //   return currentuser;
    // });
  }

  addIteminCart(item){

    console.log("push item to cart");
    console.log(this.cart);
    console.log(item);
    //this.cart.push(item);
    console.log(this.cart);
    //this.storage.set(this.currentuser.username,this.cart);

    let header = new Headers();
    header.append( 'Content-Type','application/json' );
    let body = {
        "username": this.currentuser.username,
        "cartitem": JSON.stringify(this.cart)
    };
    console.log("{ 'Content-Type' : 'application/json'}");
    this.http.post('http://localhost:8080/setItemsinCart',body,{}).then(data =>
    {
        console.log("set additemincart");
        console.log(data.data);

    });

    //this.getCart().then((cart) => {
    //  console.log("ssssss");
    //  console.log(cart)
    //  console.log("eeeeeeeee");

    //});
  }

  removeIteminCart(item){
    console.log("called remove itemincart");
    console.log(this.cart);
    this.cart.splice(this.cart.indexOf(item), 1 );
    //this.storage.set(this.currentuser.username,this.cart);
    let header = new Headers();
    header.append( 'Content-Type','application/json' );
    let body = {
        "username": this.currentuser.username,
        "cartitem": JSON.stringify(this.cart)
    };
    console.log("{ 'Content-Type' : 'application/json'}");
    this.http.post('http://localhost:8080/setItemsinCart',body,{}).then(data =>
    {
        console.log("set additemincart");
        console.log(data.data);

    });
  }

  logout(){
    console.log("called logout");
    //console.log(this.currentuser);
    let header = new Headers();
    header.append( 'Content-Type','application/json' );
    let body = {

    };
    console.log(body);
    console.log("{ 'Content-Type' : 'application/json'}");
    this.http.post('http://localhost:8080/setCurrentUser',body,{}).then(data =>
    {
        console.log("set logout")
        console.log(data.data);
    });
    //this.storage.remove('currentuser');

  }

  getuserinfo(username, password){
      console.log("called getuserinfo");
      console.log(this.allusers);
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
    return this.getItemsinCart();
    // return this.storage.get(this.currentuser.username).then((cart) => {
    //   return cart;
    // });
  }

}
