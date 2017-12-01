import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';

import { GenresProvider } from './../../providers/genres/genres';
import { GenreModel } from './../../models/genre';

@IonicPage()
@Component({
  selector: 'page-genre-catalog',
  templateUrl: 'genre-catalog.html',
})
export class GenreCatalogPage implements OnInit {

  private genres: GenreModel[];

  constructor(
    private genresProvider: GenresProvider,
    private loadingCtrl: LoadingController) {}

    ngOnInit() {
      this.fetchGenres();
    }

    fetchGenres() {
      let loadingAlert = this.loadingCtrl.create({ content: 'Loading...' });
      loadingAlert.present();

      this.genresProvider.fetchGenres()
      .subscribe((data: any) => {

        this.genres = data;
        loadingAlert.dismiss();

      }, error => {

        console.log('FAILED REQUEST');
        console.log(error);

        loadingAlert.dismiss();

      });
    }
}
