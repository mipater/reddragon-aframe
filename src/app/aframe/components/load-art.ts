// @ts-nocheck
import AFRAME from 'aframe';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadArt {
  init(): void {
    AFRAME.registerComponent('load-art', {
      schema: {type: 'string'},

      init: function() {
        this.system = document.querySelector('a-scene').systems['data-manager'];
        this.arts = this.system.getArts();

        this.parentNode = this.el.parentNode;

        // get art dimensions
        this.art = this.arts.find(art => art.id === this.data);
        const dimensions = this.art.dimensions;
        const newWidth = dimensions.width+0.300;
        const newHeight = dimensions.height+0.300;
        // load and resize image
        this.parentNode.setAttribute('depth', newWidth+0.300);
        this.parentNode.setAttribute('height', newWidth+0.200);
        this.el.setAttribute('material', 'src: https://firebasestorage.googleapis.com/v0/b/reddragon-vrmuseum.appspot.com/o/Alfred_Sisley_133.jpg?alt=media&token=4c1d7087-4c58-4793-9bb4-576c13174ac2');
        this.el.setAttribute('width', newWidth);
        this.el.setAttribute('height', newHeight);
      },
    });
  }
}
