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
        <a-plane class="clickable" id="panelCloseBtn" position="1.157 0.810 0.003" geometry="height: 0.140; width: 0.140" material="src: https://image.flaticon.com/icons/png/512/106/106830.png"></a-plane>
        <a-text id="title" position="0 0.613 0" shader="msdf" anchor="center" width="1.5" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="#e6dfad" value="`+ this.art.title +`"></a-text>
        <a-text id="author" position="-0.223 0.539 0" shader="msdf" wrapCount="52" align="left" anchor="center" baseline="top" width="1" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="#fedc01" value="`+ this.art.author +`"></a-text>
        <a-text id="description" position="0 -0.096 0" shader="msdf" anchor="center" width="1.5" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="white" value="`+ this.art.description + `"></a-text>
        `;

        sceneEl.appendChild(entityEl);

        var title = document.querySelector('#title');
        title.addEventListener('loaded', () => {
          var data = title.components.text.data;
          var totalWidth = data.value.length * (data.width / data.wrapCount);
          console.log(totalWidth);
        });

        entityEl.addEventListener('loaded', () => {
          this.infoPanelEl = entityEl;
          this.panelCloseBtn = document.getElementById('panelCloseBtn');
          panelCloseBtn.addEventListener('click', () => {
            this.closePanel();
          })
        });
      }

    });
  }
}
