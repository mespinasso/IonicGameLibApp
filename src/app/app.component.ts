import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { TabsPage } from './../pages/tabs/tabs';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { SignInPage } from './../pages/sign-in/sign-in';
import { AuthProvider } from './../providers/auth/auth';
import { GamesProvider } from './../providers/games/games';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = SignInPage;
  signinPage = SignInPage;
  signupPage = SignUpPage;
  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;

  constructor(
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      private menuCtrl: MenuController,
      private loadingCtrl: LoadingController,
      private authProvider: AuthProvider,
      private gamesProvider: GamesProvider) {

    firebase.initializeApp({
      apiKey: "AIzaSyBpaGC6uORjX2xY1HBWY7lz6WZxqi5doUo",
      authDomain: "ionicgamelibapp.firebaseapp.com"
    });

    let loadingAlert = this.loadingCtrl.create({ content: 'Checking status...' });
    loadingAlert.present();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loadingAlert.dismiss();
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        loadingAlert.dismiss();
        this.isAuthenticated = false;
        this.rootPage = SignInPage;
        this.gamesProvider.cleanLibraryCache();
      }
    });

    platform.ready().then(() => {
      // Platform and plugins are ready
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authProvider.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SignInPage);
  }
}
