import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { PlatformsProvider } from './../../providers/platforms/platforms';
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
    private platformsProvider: PlatformsProvider
  ) {}

  ngOnInit() {
    this.game = this.navParams.get('game');
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

  getPlatformDisplayName(platform: PlatformModel) {
    return PlatformHelper.getPlatformDisplayName(platform);
  }
}
