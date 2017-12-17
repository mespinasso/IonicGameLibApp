import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { IgdbDefaultRequestHeadersProvider } from './../igdb-default-request-headers/igdb-default-request-headers';
import { CompanyModel } from './../../models/company';
import { GameModel } from './../../models/game';
import { igdbAPIRequests } from '../../shared/constants';

@Injectable()
export class CompaniesProvider {

  private companiesList : CompanyModel[];

  constructor(
    public http: HttpClient,
    private defaultHeaders: IgdbDefaultRequestHeadersProvider) {}

  loadCompanies(companiesIds: number[]) {
    let unloadedCompaniesIds = this.getUnloadedCompaniesIds(companiesIds);

    if ((!this.companiesList) || (this.companiesList && unloadedCompaniesIds.length > 0)) {
      return this.http.get<CompanyModel[]>(igdbAPIRequests.company + unloadedCompaniesIds.toString() + '?limit=50&order=name:asc&fields=id,name', {headers: this.defaultHeaders.getDefaultHeaders()})
      .do((companies: CompanyModel[]) => {
        if (companies) {
          if (!this.companiesList) {
            this.companiesList = [];
          }

          this.companiesList.push(...companies);
        }
      });
    }

    return Observable.of(this.companiesList);
  }

  loadCompaniesFor(game: GameModel) {
    var companiesIds: number[] = [];

    if (game.developers) {
      for (let developerId of game.developers) {
        if (companiesIds.indexOf(developerId) < 0) {
          companiesIds.push(developerId);
        }
      }
    }

    if (game.publishers) {
      for (let publisherId of game.publishers) {
        if (companiesIds.indexOf(publisherId) < 0) {
          companiesIds.push(publisherId);
        }
      }
    }

    return this.loadCompanies(companiesIds);
  }

  getDevelopersFor(game: GameModel) : CompanyModel[] {
    var gameCompaniesForGame: CompanyModel[] = [];

    if (game.developers && this.companiesList) {
      for (let gameDeveloperId of game.developers) {
        for (let company of this.companiesList) {
          if(gameDeveloperId === company.id) {
            gameCompaniesForGame.push(company);
            break;
          }
        }
      }
    }

    return gameCompaniesForGame;
  }

  getPublishersFor(game: GameModel) : CompanyModel[] {
    var gameCompaniesForGame: CompanyModel[] = [];

    if (game.publishers && this.companiesList) {
      for (let gamePublisherId of game.publishers) {
        for (let company of this.companiesList) {
          if(gamePublisherId === company.id) {
            gameCompaniesForGame.push(company);
            break;
          }
        }
      }
    }

    return gameCompaniesForGame;
  }

  private getUnloadedCompaniesIds(companiesIds: number[]) : number[] {
    var unloadedCompaniesIds: number[] = [];
    var loadedCompaniesIds: number[] = [];

    if (this.companiesList) {
      for (let loadedCompanyId of this.companiesList) {
        loadedCompaniesIds.push(loadedCompanyId.id);
      }
    }
  
    for (let companyId of companiesIds) {
      if (loadedCompaniesIds.indexOf(companyId) < 0) {
        unloadedCompaniesIds.push(companyId);
      }
    }

    return unloadedCompaniesIds;
  }
}
