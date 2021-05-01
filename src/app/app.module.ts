import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { AddArtComponent } from './main/gallery/add-art/add-art.component';
import { ArtsResolverService } from './main/gallery/arts-resolver.service';

const routes: Routes = [
  {path: '', component: MainComponent, children:[
      {path: '', component: HomepageComponent},
      {path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard], resolve: {arts: ArtsResolverService}},
      {path: 'auth', component: AuthComponent},
    ]},
  {path: 'aframe', component: AframeComponent, resolve: {arts: ArtsResolverService}},
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
    ArtEditComponent,
    AddArtComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
