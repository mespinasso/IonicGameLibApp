import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IgdbDefaultRequestHeadersProvider } from './../igdb-default-request-headers/igdb-default-request-headers';
import { igdbAPIRequests } from './../../shared/constants';

@Injectable()
export class GenresProvider {

  constructor(
    private http: HttpClient,
    private defaultHeaders: IgdbDefaultRequestHeadersProvider
  ) {}

  fetchGenres() {
    return this.http.get(igdbAPIRequests.genre + '?limit=50', {headers: this.defaultHeaders.getDefaultHeaders()});
  }
}
