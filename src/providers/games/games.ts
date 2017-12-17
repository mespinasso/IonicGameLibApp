import { GameModel } from './../../models/game';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { IgdbDefaultRequestHeadersProvider } from './../igdb-default-request-headers/igdb-default-request-headers';
import { igdbAPIRequests } from './../../shared/constants';

@Injectable()
export class GamesProvider {

  private genreId;
  private gamesList: GameModel[];
  private libraryGamesList: GameModel[];

  constructor(
    private http: HttpClient, 
    private defaultHeaders: IgdbDefaultRequestHeadersProvider) {}

  fetchGamesByGenre(genreId: number) {
    if (!this.gamesList || (this.genreId && this.genreId != genreId)) {
      this.genreId = genreId;
      this.gamesList = null;

      return this.http.get<GameModel[]>(igdbAPIRequests.game + '?limit=50&filter[genres][eq]=' + genreId + '&order=popularity:desc&fields=*', {headers: this.defaultHeaders.getDefaultHeaders()})
      .do((games: GameModel[]) => {
        if (games) {
          if (!this.gamesList) {
            this.gamesList = [];
          }

          this.gamesList.push(...games);
        }
      });
    }

    return Observable.of(this.gamesList);
  }
  
  searchGames(searchQuery: string) {
    const requestParams = new HttpParams()
      .set('search', searchQuery);
    
      return this.http.get(igdbAPIRequests.game + '?search=' + requestParams.get('search') + '&limit=50&filter[genres][eq]=' + this.genreId + '&order=popularity:desc&fields=*', {headers: this.defaultHeaders.getDefaultHeaders()});
  }

  fetchLibraryGamesByIds(gamesIds: number[]) {
    let unloadedGamesIds: number[] = this.getUnloadedGamesIds(gamesIds);

    if (unloadedGamesIds.length > 0) {
      return this.http.get<GameModel[]>(igdbAPIRequests.game + unloadedGamesIds.toString() + '?limit=50&order=name:desc&fields=*', {headers: this.defaultHeaders.getDefaultHeaders()})
      .do((games: GameModel[]) => {
        if (games) {
          if (!this.libraryGamesList) {
            this.libraryGamesList = [];
          }

          this.libraryGamesList.push(...games);
        }
      });
    }

    return Observable.of(this.libraryGamesList);
  }

  getLoadedLibraryGames() {
    return this.libraryGamesList;
  }

  removeLibraryGame(gameId: number) {
    var gameIndex: number;
    if (this.libraryGamesList) {
      for (let game of this.libraryGamesList) {
        if (game.id === gameId) {
          gameIndex = this.libraryGamesList.indexOf(game);
        }
      }
    }

    if (gameIndex) {
      this.libraryGamesList.splice(gameIndex, 1);
    }
  }

  private getUnloadedGamesIds(gamesIds: number[]) : number[] {
    var unloadedGamesIds: number[] = [];
    var loadedGamesIds: number[] = [];

    if (gamesIds) {
      if (this.libraryGamesList) {
        for (let loadedPlatformId of this.libraryGamesList) {
          loadedGamesIds.push(loadedPlatformId.id);
        }
      }
    
      for (let gameId of gamesIds) {
        if (loadedGamesIds.indexOf(gameId) < 0) {
          unloadedGamesIds.push(gameId);
        }
      }
    }

    return unloadedGamesIds;
  }
}
