import { Injectable } from '@angular/core';
import { Art } from './art.model';
// @ts-ignore
import AFRAME from 'aframe';
import {Log} from './components/log';
import {InfoPanel} from './components/info-panel';
// const aframe = (window as any).AFRAME;

@Injectable({providedIn: 'root'})
export class AframeService {

  constructor(private log: Log, private infoPanel: InfoPanel) { }

  registerSystems(systems: [string]): void {
    if (systems.includes('data-manager')) { this.dataManager(); }
  }

  registerComponents(components: string[]): void {
    if (components.includes('log')) { this.log.init(); }
    if (components.includes('info-panel')) { this.infoPanel.init(); }
  }

  private dataManager(): void {
    AFRAME.registerSystem('data-manager', {
      init(): void {

        this.arts = [
          new Art(
            '0',
            'La barca durante l\'inondazione a Port-Marly',
            'L\'acqua della Senna uscita dagli argini ha invaso il paese, le strade e le piazze. A destra emergono dal grande specchio liquido una serie regolari di alberi coltivati. A sinistra invece l\'acqua ha circondato l\'abitazione di un mercante di vini. Il cielo è tornato sereno ed è attraversato da veloci nubi bianche che si riflettono sull\'acqua. Una piccola imbarcazione staziona all\'ingresso della casa e su di essa due persone attendono che la Senna torni nei suoi argini.',
            'https://firebasestorage.googleapis.com/v0/b/reddragon-vrmuseum.appspot.com/o/Alfred_Sisley_133.jpg?alt=media&token=4c1d7087-4c58-4793-9bb4-576c13174ac2',
            'Alfred Sisley'
          )
        ];
      },

      getArts(): Art[] {
        return this.arts;
      }
    });
  }

}
