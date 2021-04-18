import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { AframeComponent } from './aframe/aframe.component';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './main/homepage/homepage.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { FooterComponent } from './main/footer/footer.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { AuthComponent } from './main/auth/auth.component';
import { ArtEditComponent } from './main/gallery/art-edit/art-edit.component';
import {AuthInterceptorService} from './main/auth/auth-interceptor.service';
import {AuthGuard} from './main/auth/auth.guard';

const routes: Routes = [
  {path: '', component: MainComponent, children:[
      {path: '', component: HomepageComponent},
      {path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard]},
      {path: 'auth', component: AuthComponent},
    ]},
  {path: 'aframe', component: AframeComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    AframeComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    GalleryComponent,
    AuthComponent,
    ArtEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
