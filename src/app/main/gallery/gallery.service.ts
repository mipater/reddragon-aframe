import {Injectable} from '@angular/core';
import {Art} from '../../shared/art.model';
import {Subject} from 'rxjs';

export interface Positions {
  id: string;
  name: string;
  occupied: boolean;
}

@Injectable({providedIn: 'root'})
export class GalleryService {
  artsChanged = new Subject<Art[]>();
  private arts: Art[] = [];
  private positions: Positions[] = [
    {id: 'h-l1', name: 'HALLWAY - Left 1', occupied: false},
    {id: 'h-l2', name: 'HALLWAY - Left 2', occupied: false},
    {id: 'h-r1', name: 'HALLWAY - Right 1', occupied: false},
    {id: 'h-r2', name: 'HALLWAY - Right 2', occupied: false},
    {id: 'h-r3', name: 'HALLWAY - Right 3', occupied: false},
    {id: 'r1-f', name: 'ROOM 1 - Front', occupied: false},
    {id: 'r1-l1', name: 'ROOM 1 - Left 1', occupied: false},
    {id: 'r1-l2', name: 'ROOM 1 - Left 2', occupied: false},
    {id: 'r1-l3', name: 'ROOM 1 - Left 3', occupied: false},
    {id: 'r1-r1', name: 'ROOM 1 - Right 1', occupied: false},
    {id: 'r1-r2', name: 'ROOM 1 - Right 1', occupied: false},
    {id: 'r1-r3', name: 'ROOM 1 - Right 1', occupied: false},
    {id: 'r2-f', name: 'ROOM 2 - Front', occupied: false},
    {id: 'r2-l1', name: 'ROOM 2 - Left 1', occupied: false},
    {id: 'r2-l2', name: 'ROOM 2 - Left 2', occupied: false},
    {id: 'r2-l3', name: 'ROOM 2 - Left 3', occupied: false},
    {id: 'r2-r1', name: 'ROOM 2 - Right 1', occupied: false},
    {id: 'r2-r2', name: 'ROOM 2 - Right 1', occupied: false},
    {id: 'r2-r3', name: 'ROOM 2 - Right 1', occupied: false},
    {id: 'r3-f', name: 'ROOM 3 - Front', occupied: false},
    {id: 'r3-l1', name: 'ROOM 3 - Left 1', occupied: false},
    {id: 'r3-l2', name: 'ROOM 3 - Left 2', occupied: false},
    {id: 'r3-l3', name: 'ROOM 3 - Left 3', occupied: false},
    {id: 'r3-r1', name: 'ROOM 3 - Right 1', occupied: false},
    {id: 'r3-r2', name: 'ROOM 3 - Right 1', occupied: false},
    {id: 'r3-r3', name: 'ROOM 3 - Right 1', occupied: false},
  ]

  constructor() { }

  getArts(): Art[] {
    return this.arts.slice();
  }

  setArts(arts: Art[]) {
    this.arts = arts;
    this.artsChanged.next(this.arts.slice());
    this.checkAndSetPositions();
  }

  addArt(art: Art) {
    this.arts.push(art);
    this.artsChanged.next(this.arts.slice());
    this.checkAndSetPositions();
  }

  modifyArt(oldArt: Art, newArt: Art) {
    const artIndex = this.arts.findIndex(art => art.id === oldArt.id);
    this.arts[artIndex] = newArt;
    this.artsChanged.next(this.arts.slice());
    this.checkAndSetPositions();
    console.log('art updated');
  }

  checkAndSetPositions() {
    for (let i = 0; i < this.arts.length; i++) {
      for (let j = 0; j < this.positions.length; j++) {
        if (this.arts[i].position === this.positions[j].id) {
          this.positions[j].occupied = true;
        }
      }
    }
  }

  getPositions(): Positions[] {
    return this.positions.slice();
  }

}
