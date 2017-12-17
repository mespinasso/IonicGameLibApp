import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { PlatformsProvider } from './../../providers/platforms/platforms';
import { CompaniesProvider } from './../../providers/companies/companies';
import { LibraryProvider } from './../../providers/library/library';
import { GamesProvider } from './../../providers/games/games';
import { GameModel } from './../../models/game';
import { PlatformModel } from './../../models/platform';
import { PlatformHelper } from './../../shared/platform-helper';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnInit {

  game: GameModel;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private platformsProvider: PlatformsProvider,
    private companiesProvider: CompaniesProvider,
    private libraryProvider: LibraryProvider,
    private gamesProvider: GamesProvider,
    private authProvider: AuthProvider) {}

  ngOnInit() {
    this.game = this.navParams.get('game');
    this.loadCompanies();
  }

  loadCompanies() {
    let loadingAlert = this.loadingCtrl.create({ content: 'Loading...' });
    loadingAlert.present();

    this.companiesProvider.loadCompaniesFor(this.game)
    .subscribe(() => {

      loadingAlert.dismiss();

    }, error => {
      
      console.log('FAILED REQUEST');
      console.log(error);

      loadingAlert.dismiss();

    })
  }

  onAddGameToLibrary() {
    let loadingAlert = this.loadingCtrl.create({ content: 'Adding to library...' });
    loadingAlert.present();

    this.authProvider.getActiveUser().getToken().then((token: string) => {
      this.libraryProvider.addGameToLibrary(this.game.id);
      this.libraryProvider.storeList(token)
      .subscribe(() => {

        loadingAlert.dismiss();
        this.presentShortDurationToast('Added to your library!');

      }, error => {

        loadingAlert.dismiss();
        
        console.log(error);
        this.handleError(error.json().error);

      });
    });
  }

  onRemoveGameFromLibrary() {
    let loadingAlert = this.loadingCtrl.create({ content: 'Removing from library...' });
    loadingAlert.present();

    this.authProvider.getActiveUser().getToken().then((token: string) => {
      this.gamesProvider.removeLibraryGame(this.game.id);
      this.libraryProvider.removeGameFromLibrary(this.game.id);
      this.libraryProvider.storeList(token)
      .subscribe(() => {

        loadingAlert.dismiss();
        this.presentShortDurationToast('Removed from your library!');
        
      }, error => {
        
        loadingAlert.dismiss();
        
        console.log(error);
        this.handleError(error.json().error);

      });
    });
  }

  getPageTitle() : string {
    if (this.game) {
      return this.game.name;
    }

    return 'Game';
  }

  getLargeScreenshots(): string[] {
    var resizedScreenshotsURLs: string[] = [];
    if(this.game && this.game.screenshots) {
      for (var screenshot of this.game.screenshots) {
        resizedScreenshotsURLs.push(screenshot.url.replace('t_thumb', 't_screenshot_big'));
      }
    }

    return resizedScreenshotsURLs;
  }

  getPlatformsFor(game: GameModel) {
    return this.platformsProvider.getPlatformsFor(game);
  }

  getDevelopersFor(game: GameModel) {
    return this.companiesProvider.getDevelopersFor(game);
  }

  getPublishersFor(game: GameModel) {
    return this.companiesProvider.getPublishersFor(game);
  }

  getPlatformDisplayName(platform: PlatformModel) {
    return PlatformHelper.getPlatformDisplayName(platform);
  }

  isGameInLibrary() : boolean {
    return this.libraryProvider.isGameInLibrary(this.game.id);
  }

  private presentShortDurationToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });

    toast.present();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });

    alert.present();
  }
}
