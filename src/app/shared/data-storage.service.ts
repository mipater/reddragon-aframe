import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryService } from '../main/gallery/gallery.service';
import { Art } from './art.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private galleryService: GalleryService
  ) {}

  fetchArts() {
    return this.http.get<Art[]>('https://ng-complete-guide-9da49.firebaseio.com/recipes.json')
  }

}
