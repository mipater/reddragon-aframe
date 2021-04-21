import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryService } from '../main/gallery/gallery.service';
import { Art } from './art.model';
import { tap } from 'rxjs/operators';
import { Constants } from './constants.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private galleryService: GalleryService
  ) {}

  storeArts() {
    const arts = this.galleryService.getArts();

    this.http.put<Art[]>(
      Constants.FB_DBRT_PATH,
      arts
    )
    .subscribe();
  }

  fetchArts() {
    return this.http.get<Art[]>(
      Constants.FB_DBRT_PATH
    )
    .pipe(
      tap(arts => {
        this.galleryService.setArts(arts);
      })
    );
  }

  uploadImage(image: File) {
    return this.http.post<File>(
      Constants.FB_STORAGE_PATH + image.name + '?alt=media',
      image
    )
  }

}
