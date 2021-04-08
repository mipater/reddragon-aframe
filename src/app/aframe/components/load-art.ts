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
        this.parentNode.setAttribute('height', newHeight+0.200);
        this.el.setAttribute('material', 'src: ' + this.art.imgSrc);
        this.el.setAttribute('width', newWidth);
        this.el.setAttribute('height', newHeight);
      },
    });
  }
}
