import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthProvider } from './../auth/auth';
import { GameModel } from '../../models/game';

import { firebaseDatabaseLocation } from './../../shared/constants';

@Injectable()
export class LibraryProvider {

  private gamesIds: number[] = [];

  constructor(
    public http: HttpClient,
    private authProvider: AuthProvider) {}

  addGameToLibrary(gameId: number) {
    if (this.gamesIds.indexOf(gameId) < 0) {
      this.gamesIds.push(gameId);
    }
  }

  removeGameFromLibrary(gameId: number) {
    let gameIdIndex = this.gamesIds.indexOf(gameId);

    if (gameIdIndex >= 0) {
      this.gamesIds.splice(gameIdIndex, 1);
    }
  }

  isGameInLibrary(gameId: number): boolean {
    if (this.gamesIds.indexOf(gameId) >= 0) {
      return true
    }

    return false;
  }

  fetchList(token: string) {
    const userId = this.authProvider.getActiveUser().uid;
    return this.http.get(firebaseDatabaseLocation + userId + '/library.json?auth=' + token)
      .do((gamesIds: number[]) => {
        if (gamesIds) {
          this.gamesIds = gamesIds;
        } else {
          this.gamesIds = [];
        }
      });
  }

  storeList(token: string) {
    const userId = this.authProvider.getActiveUser().uid;
    return this.http.put(firebaseDatabaseLocation + userId + '/library.json?auth=' + token, this.gamesIds);
  }
}
