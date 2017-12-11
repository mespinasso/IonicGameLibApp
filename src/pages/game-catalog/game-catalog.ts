import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController, LoadingController } from 'ionic-angular';

import { GamesProvider } from './../../providers/games/games';
import { GenreModel } from './../../models/genre';
import { GameModel } from './../../models/game';

import { GamePage } from './../game/game';

@IonicPage()
@Component({
  selector: 'page-game-catalog',
  templateUrl: 'game-catalog.html',
})
export class GameCatalogPage implements OnInit {

  genre: GenreModel;
  games: GameModel[];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private gamesProvider: GamesProvider) {}

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
    let loadingAlert = this.loadingCtrl.create({ content: 'Loading Games...' });
    loadingAlert.present();

    this.gamesProvider.fetchGamesByGenre(this.genre.id)
    .subscribe((data: GameModel[]) => {

      this.games = data;
      loadingAlert.dismiss();

      console.log(this.games);

    }, error => {

      console.log('FAILED REQUEST');
      console.log(error);

      loadingAlert.dismiss();

    });
  }

  searchByKeyword(event) {
    let loadingAlert = this.loadingCtrl.create({ content: 'Searching Games...' });
    loadingAlert.present();
    
    this.gamesProvider.searchGames(event.target.value)
    .subscribe((data: GameModel[]) => {

      this.games = data;
      loadingAlert.dismiss();

      console.log(this.games);

    }, error => {

      console.log('FAILED REQUEST');
      console.log(error);

      loadingAlert.dismiss();

    });
  }

  cancelSearch(event) {
    this.fetchGamesByGenre();
  }

  onSelectGame(game: GameModel) {
    this.navCtrl.push(GamePage, {game});
  }
}
