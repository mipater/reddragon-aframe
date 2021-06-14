import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './main/homepage/homepage.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { FooterComponent } from './main/footer/footer.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { AuthComponent } from './main/auth/auth.component';
import {AuthInterceptorService} from './main/auth/auth-interceptor.service';
import {SharedModule} from "./shared/shared.module";

const routes: Routes = [
  {path: '', component: MainComponent, children:[
      {path: '', component: HomepageComponent},
      {path: 'gallery', loadChildren: () => import('./main/gallery/gallery.module').then(m => m.GalleryModule)},
      {path: 'auth', component: AuthComponent},
    ]},
  {path: 'aframe', loadChildren: () => import('./aframe/aframe.module').then(m => m.AframeModule)},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
