// @ts-nocheck
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class InfoPanel {

  init(): any {
    AFRAME.registerComponent('info-panel', {
      schema: {type: 'string'},

      init: function() {
        console.log(this);
        this.system = document.querySelector('a-scene').systems['data-manager'];
        this.arts = this.system.getArts();

        this.el.addEventListener('raycaster-intersected', evt => {
          this.intersectionPoint = evt.detail.getIntersection(this.el);
        });
      },

      events: {
        click: function (evt) {
          if (this.infoPanelEl) {
            this.infoPanelEl.parentNode.removeChild(this.infoPanelEl);
            this.infoPanelEl = null;
            console.log('This entity already exist!');
            return;
          }
          console.log('This entity was clicked!', this.data);
          this.art = this.arts.find(art => art.id === this.data);
          this.createInfoPanel(this.intersectionPoint.point);
        }
      },

      createInfoPanel: function(intersectionPoint) {
        const sceneEl = document.querySelector('a-scene');
        let entityEl = document.createElement('a-curvedimage');

        // set panel position from intersection point
        entityEl.setAttribute('position', {x: intersectionPoint.x-0.9, y: intersectionPoint.y, z: intersectionPoint.z+0.285});
        entityEl.setAttribute('geometry', {primitive: 'cylinder', radius: 3, segmentHeight: 18, segmentRadial: 48, thetalength: 72.000, height: 3.000});
        entityEl.setAttribute('material', {color: '#ffffff', shader: 'flat', transparent: false, src: '#myCanvas'})
        entityEl.innerHTML = '<a-entity id="movieTitle" position="-0.68 -0.1 0" text="shader: msdf; anchor: left; width: 1.5; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Ponyo (2003)"></a-entity>';
        sceneEl.appendChild(entityEl);
        entityEl.addEventListener('loaded', () => {
          this.infoPanelEl = entityEl;
        });
      }

    });
  }
}
