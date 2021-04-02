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
            this.closePanel();
            return;
          }
          console.log('This entity was clicked!', this.data);
          this.art = this.arts.find(art => art.id === this.data);
          this.createInfoPanel(this.intersectionPoint.point);
        }
      },

      closePanel: function() {
        this.infoPanelEl.parentNode.removeChild(this.infoPanelEl);
        this.infoPanelEl = null;
        console.log('This entity already exist!');
      },

      createInfoPanel: function(intersectionPoint) {
        const sceneEl = document.querySelector('a-scene');
        let entityEl = document.createElement('a-entity');

        // set panel position from intersection point
        entityEl.setAttribute('position', {x: intersectionPoint.x+1.200, y: intersectionPoint.y + 0.200, z: intersectionPoint.z+0.900});
        entityEl.setAttribute('geometry', {primitive: 'plane', width: 2.500, height: 1.800});
        entityEl.setAttribute('rotation', {x: 0, y: 90, z: 0});
        entityEl.setAttribute('material', {color: '#333333', shader: 'flat', transparent: false});
        entityEl.innerHTML = `
        <a-plane class="" id="panelCloseBtn" position="1.157 0.810 0.003" geometry="height: 0.140; width: 0.140"></a-plane>
        <a-plane id="img" position="0.005 0.188 0.003" crossorigin="anonymous" material="src:`+this.art.imgSrc+`; shader: flat; color: #FFF"></a-plane>
        <a-entity id="movieTitle" position="-0.626 0.744 0" text="shader: msdf; anchor: left; width: 1.5; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value:`+ this.art.title +`"></a-entity>`;
        sceneEl.appendChild(entityEl);
        entityEl.addEventListener('loaded', () => {
          this.infoPanelEl = entityEl;
          this.panelCloseBtn = document.getElementById('panelCloseBtn');
          panelCloseBtn.addEventListener('click', () => {
            //this.closePanel();
          })
        });
      }

    });
  }
}
