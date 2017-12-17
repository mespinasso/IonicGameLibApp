import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SignInPage } from './../pages/sign-in/sign-in';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { TabsPage } from './../pages/tabs/tabs';
import { LibraryPage } from './../pages/library/library';
import { GenreCatalogPage } from './../pages/genre-catalog/genre-catalog';
import { GameCatalogPage } from './../pages/game-catalog/game-catalog';
import { GamePage } from './../pages/game/game';

import { GenresProvider } from '../providers/genres/genres';
import { IgdbDefaultRequestHeadersProvider } from '../providers/igdb-default-request-headers/igdb-default-request-headers';
import { GamesProvider } from '../providers/games/games';
import { PlatformsProvider } from '../providers/platforms/platforms';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    TabsPage,
    LibraryPage,
    GenreCatalogPage,
    GameCatalogPage,
    GamePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    TabsPage,
    LibraryPage,
    GenreCatalogPage,
    GameCatalogPage,
    GamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GenresProvider,
    IgdbDefaultRequestHeadersProvider,
    GamesProvider,
    PlatformsProvider,
    AuthProvider
  ]
})
export class AppModule {}
