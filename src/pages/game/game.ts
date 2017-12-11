import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { GameModel } from './../../models/game';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnInit {

  game: GameModel;

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.game = this.navParams.get('game');
  }

  getPageTitle() : string {
    if (this.game) {
      return this.game.name;
    }

    return 'Game';
  }
}
