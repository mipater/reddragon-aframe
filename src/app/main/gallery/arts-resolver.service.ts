import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';
import {Art} from '../../shared/art.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {GalleryService} from './gallery.service';
import {catchError, map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ArtsResolverService implements Resolve<Art[] | string> {
  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Art[] | string> | Promise<Art[] | string> | Art[] {
    const arts = this.galleryService.getArts();

    if (arts.length === 0) {
      return this.dataStorageService.fetchArts()
        .pipe(
          map((arts) => {
            let artsArray: Art[] = [];
            arts.forEach(art => {
              artsArray.push(new Art(art._id, art._title, art._description, art._imgSrc, art._dimensions, art._author));
            })
            return artsArray;
          }),
          tap(arts => {
            this.galleryService.setArts(arts);
          }),
          catchError(error => {
            if (error instanceof TypeError) {
              error = 'No arts found in DB'
            }
            return of (error);
          })
        );
    } else {
      return arts;
    }
  }
}
