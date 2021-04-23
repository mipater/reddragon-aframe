import {Injectable} from '@angular/core';
import {Art} from '../../shared/art.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GalleryService {
  artsChanged = new Subject<Art[]>();
  private arts: Art[] = [];

  constructor() { }

  getArts(): Art[] {
    return this.arts.slice();
  }

  setArts(arts: Art[]) {
    this.arts = arts;
    this.artsChanged.next(this.arts.slice());
  }

  addArt(art: Art) {
    this.arts.push(art);
    this.artsChanged.next(this.arts.slice());
  }

  updateArts(arts: Art[]) {
    this.arts = arts;
  }

}
