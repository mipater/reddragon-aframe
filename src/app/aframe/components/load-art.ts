// @ts-nocheck
import AFRAME from 'aframe';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadArt {
  init(): void {
    if ('undefined' === typeof AFRAME.components['load-art']) {
      AFRAME.registerComponent('load-art', {
        schema: {type: 'string'},

        init: function () {
          this.system = document.querySelector('a-scene').systems['data-manager'];
          this.arts = this.system.getArts();

          this.parentNode = this.el.parentNode;

          // get art dimensions
          this.art = this.arts.find(art => art.position === this.data);
          var btn = document.querySelector('[info-panel=' + this.art.position + ']');
          if (this.art) {
            const dimensions = this.art.dimensions;

            // load and resize image
            this.parentNode.setAttribute('depth', dimensions.width + 0.300);
            this.parentNode.setAttribute('height', dimensions.height + 0.200);
            this.el.setAttribute('material', 'src: ' + this.art.imgSrc);
            this.el.setAttribute('width', dimensions.width);
            this.el.setAttribute('height', dimensions.height);

            btn.setAttribute('position', {x: 0, y: 0, z: (dimensions.width/2) + 0.400})
          }
        },
      });
    }
  }
}
