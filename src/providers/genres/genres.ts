import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import { IgdbDefaultRequestHeadersProvider } from './../igdb-default-request-headers/igdb-default-request-headers';
import { igdbAPIRequests } from './../../shared/constants';
import { GenreModel } from './../../models/genre';

@Injectable()
export class GenresProvider {

  private genresList;

  constructor(
    private http: HttpClient,
    private defaultHeaders: IgdbDefaultRequestHeadersProvider) {}

  fetchGenres() {
    if (!this.genresList) {
      this.genresList = this.http.get<GenreModel[]>(igdbAPIRequests.genre + '?limit=50&order=name:asc&fields=*', {headers: this.defaultHeaders.getDefaultHeaders()})
        .publishReplay(1)
        .refCount();
    }

    return this.genresList;
  }
}
