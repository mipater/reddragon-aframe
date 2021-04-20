import {Injectable} from '@angular/core';
import {Art} from '../../shared/art.model';

@Injectable({providedIn: 'root'})
export class GalleryService {
  private arts: Art[] = [];

  constructor() { }

  getArts(): Art[] {
    return this.arts.slice();
  }

  setRecipes(arts: Art[]) {
    this.arts = arts;
    console.log(this.arts);
    //this.recipesChanged.next(this.recipes.slice());
  }

}
