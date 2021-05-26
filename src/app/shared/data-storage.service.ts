import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GalleryService } from '../main/gallery/gallery.service';
import { Art } from './art.model';
import {retry} from 'rxjs/operators';
import { Constants } from './constants.model';

interface ArtData {
  _id: string;
  _position: string;
  _title: string;
  _description: string;
  _imgSrc: string;
  _dimensions: { width: number, height: number };
  _author: string;
}

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private galleryService: GalleryService
  ) {}

  storeArts() {
    const arts = this.galleryService.getArts();
    return this.http.put<Art[]>(
      Constants.FB_DBRT_PATH,
      arts
    );
  }

  fetchArts() {
    return this.http.get<ArtData[]>(
      Constants.FB_DBRT_PATH
    );
  }

  uploadImage(image: File) {
    return this.http.post<any>(
      Constants.FB_STORAGE_PATH + image.name + '?alt=media',
      image
    );
  }

  deleteImage(name: string) {
    return this.http.delete<any>(
      name,
    )
    .pipe(
      retry(1)
    );
  }

}
