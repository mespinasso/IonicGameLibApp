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
  private gamesList : Observable<GameModel[]>;

  constructor(
    private http: HttpClient, 
    private defaultHeaders: IgdbDefaultRequestHeadersProvider) {}

  fetchGamesByGenre(genreId: number) {
    if(!this.gamesList || (this.genreId && this.genreId != genreId)) {
      this.genreId = genreId;
      this.gamesList = null;

      this.gamesList = this.http.get<GameModel[]>(igdbAPIRequests.game + '?limit=50&filter[genres][eq]=' + genreId + '&order=popularity:desc&fields=*', {headers: this.defaultHeaders.getDefaultHeaders()})
        .publishReplay(1)
        .refCount();
    }

    return this.gamesList;
  }

  searchGames(searchQuery: string) {
    const requestParams = new HttpParams()
      .set('search', searchQuery);
    
      return this.http.get(igdbAPIRequests.game + '?search=' + requestParams.get('search') + '&limit=50&filter[genres][eq]=' + this.genreId + '&order=popularity:desc&fields=*', {headers: this.defaultHeaders.getDefaultHeaders()});
  }
}
