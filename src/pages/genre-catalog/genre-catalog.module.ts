import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenreCatalogPage } from './genre-catalog';

@NgModule({
  declarations: [
    GenreCatalogPage,
  ],
  imports: [
    IonicPageModule.forChild(GenreCatalogPage),
  ],
})
export class GenreCatalogPageModule {}
