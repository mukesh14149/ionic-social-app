import { Component } from '@angular/core';
import { NavController, MenuController,ViewController} from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { WelcomePage } from '../welcome/welcome';
import { Item } from '../../app/model/item';
import { User } from '../../app/model/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
  export class HomePage {
  private items: Item[] = [];
  private cartitem :Item[] = [];
  private cartflag = new Map();
  private cartlength = 0;
  constructor(private menu:MenuController, private viewCtrl:ViewController,private dataprovider: DataProvider, public navCtrl: NavController) {
    console.log("In constructor")
    this.cartitem = [];
    this.getItems();
    this.dataprovider.resetValues();
  }

  ionViewWillEnter(){
  //  this.menu.enable(true);
    console.log("In homepage");
  //  this.navCtrl.popToRoot();
  //  this.viewCtrl.showBackButton(false);
    this.menu.enable(true);
    this.dataprovider.getcurrentuser().then((currentuser) => this.OnCheck(currentuser));
  }

  updatecartflag(){
    console.log("In updatecartflag");
    console.log(this.cartitem);

    //console.log(this.cartitem.length);
    if(this.items!=null){
      for(let i=0;i<this.items.length;i++)
        this.cartflag.set(this.items[i].itemname,false);
    }
    if(this.cartitem.length!=0){
      for(let i=0;i<this.cartitem.length;i++)
      {
          this.cartflag.set(this.cartitem[i].itemname,true);
          //console.log(this.cartitem[i])
          //console.log(this.cartflag);
      }
    }
    //console.log(this.cartflag);
  }


  OnCheck(currentuser){
    console.log("OnCheck");
    if(currentuser == null){
      console.log("Wrong user");
      this.navCtrl.push(WelcomePage);
    }else{
      this.dataprovider.getCart().then((cartitem) => {
        console.log("Here is cartitem");
        console.log(this.cartitem);
        if(cartitem!= null)
          this.cartitem = cartitem
        else
          this.cartitem = []

        if(cartitem!=null)
        this.cartlength = this.cartitem.length;
        else
          this.cartlength = 0;
      //  console.log(this.cartflag.length+"ssss"+this.cartitem.length);
      console.log(this.cartitem);
      this.updatecartflag();

      });

    }
  }

  changeCart(index){
      console.log("called addToCar"+index);
      //console.log(this.cartflag.get(this.items[index].itemname));
      if(!this.cartflag.get(this.items[index].itemname)){
        console.log("Turn to True");
        //console.log(this.items[index]);
        console.log(this.cartitem);
        this.cartitem.push(this.items[index]);
        console.log(this.cartitem);

        this.dataprovider.addIteminCart(this.items[index].itemname); //add item in db cartitem
        console.log("tututut");
        console.log(this.cartitem);

         //add item in temp array cartitem
        this.updatecartflag();
      }else{
        console.log("Turn to False");
      //  console.log(this.cartitem);
      //  console.log(this.items[index]);
      //  console.log(this.cartitem[0]);
        let temp_index = this.cartitem.findIndex(obj => obj['itemname'] === this.items[index].itemname);


        //this.cartitem.indexOf(this.items[index]) get the index in cartitem where that particular item stored
        this.cartflag.set(this.cartitem[temp_index].itemname,false);
        this.dataprovider.removeIteminCart(this.items[index].itemname);  //remove item from db
      //  console.log(this.cartitem);
        this.cartitem.splice(temp_index, 1); //remove item from temp array cartitem
      //  console.log(this.cartitem);
        this.updatecartflag();
      }
      this.cartlength = this.cartitem.length;
    //  console.log("cartlenght"+this.cartlength);
  }

  getItems(){
    console.log("called getItems");
    //this.dataprovider.addItems({  itemname:"item2", imgsrc:"img2"});

      this.dataprovider.getallitems().then((items) => {
        //console.log("in  getItems");
        this.items = items;
        for(let i=0;i<this.items.length;i++)
          this.cartflag.set(this.items[i].itemname,false);
        //  console.log(this.cartflag);
      }).catch(function(error) {
        //    console.log(error);
        });
  }


}
