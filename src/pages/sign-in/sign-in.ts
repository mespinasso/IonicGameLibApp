import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, LoadingController, AlertController, NavController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { SignUpPage } from './../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(
    private navContoller: NavController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    });

    loading.present();

    this.authProvider.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ["Ok"]
        });
        alert.present();
      });
  }

  onRegister() {
    this.navContoller.setRoot(SignUpPage);
  }
}
