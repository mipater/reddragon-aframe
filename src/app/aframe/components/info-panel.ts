// @ts-nocheck
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class InfoPanel {

  init(): any {
    AFRAME.registerComponent('info-panel', {
      schema: {type: 'string'},

      init: function() {
        this.system = document.querySelector('a-scene').systems['data-manager'];
        this.arts = this.system.getArts();
        this.frame = this.el.parentNode;
      },

      events: {
        click: function (evt) {
          if (this.infoPanelEl) {
            this.closePanel();
            return;
          }
          this.art = this.arts.find(art => art.position === this.data);
          if (this.art) {
            this.createInfoPanel();
          }
        }
      },

      closePanel: function() {
        this.infoPanelEl.parentNode.removeChild(this.infoPanelEl);
        this.infoPanelEl = null;
      },

      createInfoPanel: function() {
        const sceneEl = document.querySelector('a-scene');
        const artDescription = this.art.description;
        let entityEl = document.createElement('a-entity');

        entityEl.setAttribute('position', {x: -0.522, y: 0, z: -0.024});
        entityEl.setAttribute('geometry', {primitive: 'plane', width: 2.500, height: 1.800});
        entityEl.setAttribute('rotation', {x: 0, y: 270, z: 0});
        entityEl.setAttribute('material', {color: '#333333', shader: 'flat', transparent: false});
        entityEl.innerHTML = `
        <a-plane class="clickable" id="panelCloseBtn-`+ this.data + `"  position="1.157 0.810 0.003" geometry="height: 0.140; width: 0.140" material="src: https://image.flaticon.com/icons/png/512/106/106830.png"></a-plane>
        <a-text id="title" position="0 0.613 0" shader="msdf" anchor="center" width="1.5" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="#e6dfad" value="`+ this.art.title +`"></a-text>
        <a-text id="author" position="-0.223 0.539 0" shader="msdf" wrapCount="52" align="left" anchor="center" baseline="top" width="1" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="#fedc01" value="`+ this.art.author +`"></a-text>
        <a-text id="description" position="0 -0.096 0" shader="msdf" wrapCount="60" anchor="center" width="1.5" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="white" value="`+ artDescription + `"></a-text>
        `;

        /*
        // calculate text length
        // 19.2375 max totalWidth | 513 text length for 1 page
        var description = document.querySelector('#description');
        description.addEventListener('loaded', () => {
          var data = description.components.text.data;
          var totalWidth = data.value.length * (data.width / data.wrapCount);
          console.log(totalWidth, data);
        });*/

        if (artDescription.length > 1312) {
          // need to split into more pages
          let textPages = [];
          let splittedDesc = artDescription.split('.');
          let currentText = '';
          let currentTextLength = 0;
          for (let i = 0; i < splittedDesc.length; i++) {
            // select text to insert into pages
            currentText += splittedDesc[i];
            currentTextLength += splittedDesc[i].length;
            if (currentTextLength > 1312 || (i+1 !== splittedDesc.length && currentTextLength + splittedDesc[i+1].length > 1312) || i == splittedDesc.length-1) {
              textPages.push(currentText);
              currentText = '';
              currentTextLength = 0;
            }
          }
          console.log(textPages, textPages.length);
        } else {
          this.frame.appendChild(entityEl);
        }

        entityEl.addEventListener('loaded', () => {
          var description = document.querySelector('#description');
          description.setAttribute('text', {'wrapCount': 60.000});

          this.infoPanelEl = entityEl;
          this.panelCloseBtn = document.getElementById('panelCloseBtn-'+this.data);
          this.panelCloseBtn.addEventListener('click', () => {
            this.closePanel();
          });
        });
      }

    });
  }
}
