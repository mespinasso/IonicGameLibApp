import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LibraryPage } from './../library/library';
import { GenreCatalogPage } from './../genre-catalog/genre-catalog';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  libraryPage = LibraryPage;
  genreCatalogPage = GenreCatalogPage;
}
