import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome'
import { DataProvider } from '../providers/data/data';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  rootPage:any = HomePage;

  constructor(private dataprovider:DataProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  addTempItems(){
    this.dataprovider.addItems({ itemname:"item1", imgsrc:"img1"});
    this.dataprovider.addItems({ itemname:"item2", imgsrc:"img2"});
    this.dataprovider.addItems({ itemname:"item3", imgsrc:"img3"});
    this.dataprovider.addItems({ itemname:"item4", imgsrc:"img4"});
    this.dataprovider.addItems({ itemname:"item5", imgsrc:"img5"});
    this.nav.popToRoot();
  }

  OnProfile(){
//    this.rootPage = ProfilePage;
    this.nav.push(ProfilePage);
  }

  OnLogout(){
    console.log("In onlogout");
    this.dataprovider.logout();
  //  this.rootPage = WelcomePage;
    //this.nav.popToRoot();
    this.nav.push(WelcomePage);
  }


}
