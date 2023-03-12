import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from './core/utils/translate';
import { FirebaseService } from './core/services/firebase/firebase-service';
import { FirebaseWebService } from './core/services/firebase/web/firebase-web.service';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      })],
  providers: [
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    },
    {
      provide: FirebaseService,
      deps: [],
      useFactory: () => new FirebaseWebService()
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
