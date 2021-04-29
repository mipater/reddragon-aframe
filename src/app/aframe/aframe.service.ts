import { Injectable } from '@angular/core';
import { Art } from '../shared/art.model';
// @ts-ignore
import AFRAME from 'aframe';
import {Log} from './components/log';
import {InfoPanel} from './components/info-panel';
import {LoadArt} from './components/load-art';
// const aframe = (window as any).AFRAME;

@Injectable({providedIn: 'root'})
export class AframeService {

  constructor(private log: Log, private infoPanel: InfoPanel, private loadArt: LoadArt) { }

  registerSystems(systems: [string]): void {
    if (systems.includes('data-manager')) { this.dataManager(); }
  }

  registerComponents(components: string[]): void {
    if (components.includes('log')) { this.log.init(); }
    if (components.includes('info-panel')) { this.infoPanel.init(); }
    if (components.includes('load-art')) { this.loadArt.init(); }
  }

  private dataManager(): void {
    AFRAME.registerSystem('data-manager', {
      init(): void {

        this.arts = [

        ];
      },

      getArts(): Art[] {
        return this.arts;
      }
    });
  }

}
