import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameCatalogPage } from './game-catalog';

@NgModule({
  declarations: [
    GameCatalogPage,
  ],
  imports: [
    IonicPageModule.forChild(GameCatalogPage),
  ],
})
export class GameCatalogPageModule {}
