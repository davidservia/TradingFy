import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CoreModule } from 'src/app/core/core.module';
import { SinginComponent } from './singin/singin.component';
import { SignupComponent } from './singup/singup.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage ,SinginComponent, SignupComponent]
})
export class LoginPageModule {}
