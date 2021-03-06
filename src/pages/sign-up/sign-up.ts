import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, LoadingController, AlertController, NavController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { SignInPage } from './../sign-in/sign-in';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(
    private navContoller: NavController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing up...'
    });

    loading.present();

    this.authProvider.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sign-up failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
  
  onLogIn() {
    this.navContoller.setRoot(SignInPage);
  }
}
