import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { IgdbDefaultRequestHeadersProvider } from './../igdb-default-request-headers/igdb-default-request-headers';
import { PlatformModel } from './../../models/platform';
import { GameModel } from './../../models/game';
import { igdbAPIRequests } from '../../shared/constants';

@Injectable()
export class PlatformsProvider {

  private platformsList : PlatformModel[];

  constructor(
    private http: HttpClient,
    private defaultHeaders: IgdbDefaultRequestHeadersProvider) {}

  loadPlatforms(platformsIds: number[]) {
    let unloadedPlatformsIds = this.getUnloadedPlatformsIds(platformsIds);

    if ((!this.platformsList) || (this.platformsList && unloadedPlatformsIds.length > 0)) {
      return this.http.get<PlatformModel[]>(igdbAPIRequests.platform + unloadedPlatformsIds.toString() + '?limit=50&order=name:asc&fields=id,name,slug,alternative_name,logo,url,website,summary', {headers: this.defaultHeaders.getDefaultHeaders()})
      .do((platforms: PlatformModel[]) => {
        if (platforms) {
          if (!this.platformsList) {
            this.platformsList = [];
          }

          this.platformsList.push(...platforms);
        }
      });
    }

    return Observable.of(this.platformsList);
  }

  loadPlatformsFor(gamesList: GameModel[]) {
    var platformsIds: number[] = [];

    for (let game of gamesList) {
      if (game.platforms) {
        for (let platformId of game.platforms) {
          if (platformsIds.indexOf(platformId) < 0) {
            platformsIds.push(platformId);
          }
        }
      }
    }

    return this.loadPlatforms(platformsIds);
  }

  getPlatformsFor(game: GameModel) : PlatformModel[] {
    var gamePlatformsForGame: PlatformModel[] = [];

    if (game.platforms && this.platformsList) {
      for (let gamePlatformId of game.platforms) {
        for (let platform of this.platformsList) {
          if(gamePlatformId === platform.id) {
            gamePlatformsForGame.push(platform);
            break;
          }
        }
      }
    }

    return gamePlatformsForGame;
  }

  private getUnloadedPlatformsIds(platformsIds: number[]) : number[] {
    var unloadedPlatformsIds: number[] = [];
    var loadedPlatformsIds: number[] = [];

    if (this.platformsList) {
      for (let loadedPlatformId of this.platformsList) {
        loadedPlatformsIds.push(loadedPlatformId.id);
      }
    }
  
    for (let platformId of platformsIds) {
      if (loadedPlatformsIds.indexOf(platformId) < 0) {
        unloadedPlatformsIds.push(platformId);
      }
    }

    return unloadedPlatformsIds;
  }
}
