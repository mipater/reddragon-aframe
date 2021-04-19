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

  storeArts() {
    const arts = this.galleryService.getArts();
    this.http.put<Art[]>(
      'https://reddragon-vrmuseum-default-rtdb.firebaseio.com/arts.json',
      arts
    ).subscribe();
  }

  fetchArts() {
    return this.http.get<Art[]>('https://reddragon-vrmuseum-default-rtdb.firebaseio.com/arts.json')
  }

}
