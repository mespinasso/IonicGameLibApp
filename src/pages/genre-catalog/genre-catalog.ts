import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';

import { GenresProvider } from './../../providers/genres/genres';
import { GenreModel } from './../../models/genre';

import { GameCatalogPage } from './../game-catalog/game-catalog';

@IonicPage()
@Component({
  selector: 'page-genre-catalog',
  templateUrl: 'genre-catalog.html',
})
export class GenreCatalogPage implements OnInit {

  private genres: GenreModel[];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private genresProvider: GenresProvider) {}

    ngOnInit() {
      this.fetchGenres();
    }

    fetchGenres() {
      let loadingAlert = this.loadingCtrl.create({ content: 'Loading Genres...' });
      loadingAlert.present();

      this.genresProvider.fetchGenres()
      .subscribe((data: GenreModel[]) => {

        this.genres = data;
        loadingAlert.dismiss();

      }, error => {

        console.log('FAILED REQUEST');
        console.log(error);

        loadingAlert.dismiss();

      });
    }

    onSelectGenre(genre: GenreModel) {
      this.navCtrl.push(GameCatalogPage, {genre});
    }
}