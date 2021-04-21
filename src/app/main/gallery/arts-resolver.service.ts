import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {Art} from '../../shared/art.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {GalleryService} from './gallery.service';


@Injectable({providedIn: 'root'})
export class ArtsResolverService implements Resolve<Art[]> {
  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Art[]> | Promise<Art[]> | Art[] {
    this.dataStorageService.fetchArts().subscribe();
    return this.galleryService.getArts();
  }
}
