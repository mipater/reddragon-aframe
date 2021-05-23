
import { Injectable } from '@angular/core';
import { Art } from '../shared/art.model';
// @ts-ignore
import AFRAME from 'aframe';
import {Log} from './components/log';
import {InfoPanel} from './components/info-panel';
import {LoadArt} from './components/load-art';
import {GalleryService} from '../main/gallery/gallery.service';
import {DataStorageService} from '../shared/data-storage.service';
import {ActivatedRoute} from '@angular/router';
// const aframe = (window as any).AFRAME;

@Injectable({providedIn: 'root'})
export class AframeService {
  arts: Art[] = [];

  constructor(private log: Log, private infoPanel: InfoPanel, private loadArt: LoadArt) { }

  setArts(arts: Art[]) {
    this.arts = arts;
  }

  registerSystems(systems: [string]): void {
    if (systems.includes('data-manager')) { this.dataManager(this.arts); }
  }

  registerComponents(components: string[]): void {
    if (components.includes('log')) { this.log.init(); }
    if (components.includes('info-panel')) { this.infoPanel.init(); }
    if (components.includes('load-art')) { this.loadArt.init(); }
  }

  private dataManager(arts: Art[]): void {
    if ('undefined' === typeof AFRAME.systems['data-manager']) {
      AFRAME.registerSystem('data-manager', {
        init(): void {
          this.arts = arts;
        },

        getArts(): Art[] {
          return this.arts;
        }
      });
    }
  }

}
