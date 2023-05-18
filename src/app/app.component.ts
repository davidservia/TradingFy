import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from './core/services/firebase/firebase-service';
import { UserService } from './core/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mercados', url: '/folder/Inbox', icon: 'Home' },
    { title: 'Gestion de Mercados', url: '/markets', icon: 'basket' },
    { title: 'Gestion de Activos', url: '/positions', icon: 'server' },
    { title: 'Grafico de activos', url: '/charts', icon: 'server' },
    { title: 'Asignar Activos a Mercados', url: '/assign', icon: 'archive' },
    { title: 'Contacto', url: '/about', icon: 'people'}
  ];
  public labels =[]
  language = 0; // 0 español, 1 ingles
  constructor(
    private translate: TranslateService,
    private firebase: FirebaseService,
    public user:UserService
    
  ) {
    this.translate.setDefaultLang('espanol');
  }

  signOut(){
    this.firebase.signOut();
  }
  getUser(){
    this.firebase.getUser()
  } 

  onLanguage(languageCode: string) {
    this.translate.use(languageCode);
  }
  OnToggleDarkMode() {
    document.body.setAttribute('color-theme', 'dark');
  }

  OnToggleLightMode() {
    document.body.setAttribute('color-theme', 'light');
  }
}
