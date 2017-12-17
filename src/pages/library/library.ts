import { GamePage } from './../game/game';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, Loading, NavController, LoadingController } from 'ionic-angular';

import { LibraryProvider } from './../../providers/library/library';
import { GamesProvider } from '../../providers/games/games';
import { PlatformsProvider } from './../../providers/platforms/platforms';
import { GameModel } from '../../models/game';
import { PlatformModel } from './../../models/platform';
import { PlatformHelper } from './../../shared/platform-helper';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  games: GameModel[];
  platforms: PlatformModel[];

  isLoadingGamesFromLibrary = false;
  isLoadingGamesFromIGDB = false;
  isLoadingPlatforms = false;

  loadingAlert: Loading;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider, 
    private libraryProvider: LibraryProvider,
    private gamesProvider: GamesProvider,
    private platformsProvider: PlatformsProvider) {}
  
  ionViewWillEnter() {
    this.fetchGamesIDsFromLibrary();
  }

  fetchGamesIDsFromLibrary() {
    this.isLoadingGamesFromLibrary = true;
    this.loadingAlert = this.loadingCtrl.create({ content: 'Loading Games...' });
    this.loadingAlert.present();

    this.authProvider.getActiveUser().getToken().then((token: string) => {
      this.libraryProvider.fetchList(token)
      .subscribe((gameIds: number[]) => {

        this.fetchGamesByIds(gameIds);

        this.isLoadingGamesFromLibrary = false;
        this.dismissLoadingAlert();

      }, error => {

        console.log('FAILED REQUEST');
        console.log(error);

        this.isLoadingGamesFromLibrary = false;
        this.dismissLoadingAlert();

      });
    });
  }

  fetchGamesByIds(gamesIds: number[]) {
    this.isLoadingGamesFromIGDB = true;

    this.gamesProvider.fetchLibraryGamesByIds(gamesIds)
    .subscribe(() => {

      this.games = this.gamesProvider.getLoadedLibraryGames();
      this.loadPlatforms();

      this.isLoadingGamesFromIGDB = false;
      this.dismissLoadingAlert();
      
    }, error => {

      console.log('FAILED REQUEST');
      console.log(error);

      this.isLoadingGamesFromIGDB = false;
      this.dismissLoadingAlert();

    });
  }

  loadPlatforms() {
    this.isLoadingPlatforms = true;

    this.platformsProvider.loadPlatformsFor(this.games)
    .subscribe((data: any) => {

      this.isLoadingPlatforms = false;
      this.dismissLoadingAlert();

    }, error => {
      
      console.log('FAILED REQUEST');
      console.log(error);

      this.isLoadingPlatforms = false;
      this.dismissLoadingAlert();

    })
  }

  getPlatformsFor(game: GameModel) {
    return this.platformsProvider.getPlatformsFor(game);
  }

  getPlatformDisplayName(platform: PlatformModel) {
    return PlatformHelper.getPlatformDisplayName(platform);
  }

  onSelectGame(game: GameModel) {
    this.navCtrl.push(GamePage, {game});
  }

  dismissLoadingAlert() {
    if (!this.isLoadingGamesFromLibrary && !this.isLoadingGamesFromIGDB && !this.isLoadingPlatforms && this.loadingAlert) {
      this.loadingAlert.dismiss();
    }
  }
}
