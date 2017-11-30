import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { igdbUserKey } from './../../shared/constants';

@Injectable()
export class IgdbDefaultRequestHeadersProvider {

  private readonly userKeyHeaderKey = 'user-key';
  private readonly acceptHeaderKey = 'Accept';

  constructor(public http: HttpClient) {}

  getDefaultHeaders() : HttpHeaders {
    const requestHeaders = new HttpHeaders()
      .set(this.userKeyHeaderKey, igdbUserKey)
      .set(this.acceptHeaderKey, 'application/json');

    return requestHeaders;
  }
}
