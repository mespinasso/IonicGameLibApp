import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController, LoadingController, Loading } from 'ionic-angular';

import { GamesProvider } from './../../providers/games/games';
import { PlatformsProvider } from './../../providers/platforms/platforms';
import { LibraryProvider } from './../../providers/library/library';
import { GenreModel } from './../../models/genre';
import { GameModel } from './../../models/game';
import { PlatformModel } from './../../models/platform';
import { PlatformHelper } from './../../shared/platform-helper';

import { GamePage } from './../game/game';

@IonicPage()
@Component({
  selector: 'page-game-catalog',
  templateUrl: 'game-catalog.html',
})
export class GameCatalogPage implements OnInit {

  genre: GenreModel;
  games: GameModel[];
  platforms: PlatformModel[];

  isLoadingGames = false;
  isSearchingGames = false;
  isLoadingPlatforms = false;

  loadingAlert: Loading;
  searchingAlert: Loading;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private gamesProvider: GamesProvider,
    private platformsProvider: PlatformsProvider,
    private libraryProvider: LibraryProvider) {}

  ngOnInit() {
    this.genre = this.navParams.get('genre');
    this.fetchGamesByGenre();
  }

  getPageTitle() : string {
    if (this.genre) {
      return this.genre.name;
    }

    return 'Game Catalog';
  }

  fetchGamesByGenre() {
    this.isLoadingGames = true;
    this.loadingAlert = this.loadingCtrl.create({ content: 'Loading Games...' });
    this.loadingAlert.present();

    this.gamesProvider.fetchGamesByGenre(this.genre.id)
    .subscribe((data: GameModel[]) => {

      this.games = data;
      this.loadPlatforms();

      this.isLoadingGames = false;
      this.dismissLoadingAlert();

      // TODO: Remove log
      console.log(this.games);

    }, error => {

      console.log('FAILED REQUEST');
      console.log(error);

      this.isLoadingGames = false;
      this.dismissLoadingAlert();

    });
  }

  searchByKeyword(event) {
    this.isSearchingGames = true;
    this.searchingAlert = this.loadingCtrl.create({ content: 'Searching Games...' });
    this.searchingAlert.present();
    
    this.gamesProvider.searchGames(event.target.value)
    .subscribe((data: GameModel[]) => {

      this.games = data;
      this.loadPlatforms();

      this.isSearchingGames = false;
      this.dismissSearchingAlert();

    }, error => {

      console.log('FAILED REQUEST');
      console.log(error);

      this.isSearchingGames = false;
      this.dismissSearchingAlert();

    });
  }

  loadPlatforms() {
    this.isLoadingPlatforms = true;
    this.platformsProvider.loadPlatformsFor(this.games)
    .subscribe((data: any) => {

      this.isLoadingPlatforms = false;
      this.dismissLoadingAlert();
      this.dismissSearchingAlert();

    }, error => {
      
      console.log('FAILED REQUEST');
      console.log(error);

      this.isLoadingPlatforms = false;
      this.dismissLoadingAlert();
      this.dismissSearchingAlert();

    })
  }

  getPlatformsFor(game: GameModel) {
    return this.platformsProvider.getPlatformsFor(game);
  }

  getPlatformDisplayName(platform: PlatformModel) {
    return PlatformHelper.getPlatformDisplayName(platform);
  }

  isGameInLibrary(game: GameModel) : boolean {
    return this.libraryProvider.isGameInLibrary(game.id);
  }

  cancelSearch(event) {
    this.fetchGamesByGenre();
  }

  onSelectGame(game: GameModel) {
    this.navCtrl.push(GamePage, {game});
  }

  dismissLoadingAlert() {
    if (!this.isLoadingGames && !this.isLoadingPlatforms && this.loadingAlert) {
      this.loadingAlert.dismiss();
    }
  }

  dismissSearchingAlert() {
    if (!this.isSearchingGames && !this.isLoadingPlatforms && this.searchingAlert) {
      this.searchingAlert.dismiss();
    }
  }
}
