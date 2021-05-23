// @ts-nocheck
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class InfoPanel {

  init(): any {
    if ('undefined' === typeof AFRAME.components['info-panel']) {
      AFRAME.registerComponent('info-panel', {
        schema: {type: 'string'},

        init: function () {
          this.system = document.querySelector('a-scene').systems['data-manager'];
          this.arts = this.system.getArts();
          this.frame = this.el.parentNode;
          this.id = this.frame.id;
          this.pagination = {
            totalPages: 0,
            currentPage: 1,
            texts: [],
            prevBtn: null,
            nextBtn: null,
            descriptionEl: null,
            init: function (id) {
              this.prevBtn = document.querySelector('#panelPreviousBtn' + id);
              this.nextBtn = document.querySelector('#panelNextBtn' + id);
              this.descriptionEl = document.querySelector('#description' + id);

              this.descriptionEl.setAttribute("value", this.texts[this.currentPage - 1]);
              this.descriptionEl.setAttribute('text', {'wrapCount': 60.000});
              this.nextBtn.setAttribute("visible", true);

              this.handleNavigation();
            },
            setPages: function (texts, totalPages) {
              this.texts = texts;
              this.totalPages = totalPages;
            },
            handleNavigation: function () {
              this.prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                  this.currentPage--;
                  if (this.currentPage === 1) {
                    this.prevBtn.setAttribute("visible", false);
                  }
                  this.nextBtn.setAttribute("visible", true);
                  this.descriptionEl.setAttribute("value", this.texts[this.currentPage - 1]);
                }
              });
              this.nextBtn.addEventListener('click', () => {
                if (this.currentPage < this.totalPages) {
                  this.currentPage++;
                  if (this.currentPage === this.totalPages) {
                    this.nextBtn.setAttribute("visible", false);
                  }
                  this.prevBtn.setAttribute("visible", true);
                  this.descriptionEl.setAttribute("value", this.texts[this.currentPage - 1]);
                }
              });
            }
          };
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

        closePanel: function () {
          this.infoPanelEl.parentNode.removeChild(this.infoPanelEl);
          this.infoPanelEl = null;
        },

        createInfoPanel: function () {
          var artDescription = this.art.description;
          let entityEl = document.createElement('a-entity');
          const isMultiPageDescription = this.createMultiPageDescription(artDescription);

          entityEl.setAttribute('position', {x: -0.522, y: 0, z: -0.024});
          entityEl.setAttribute('geometry', {primitive: 'plane', width: 2.500, height: 1.800});
          entityEl.setAttribute('rotation', {x: 0, y: 270, z: 0});
          entityEl.setAttribute('material', {color: '#333333', shader: 'flat', transparent: false});
          entityEl.innerHTML = `
        <a-plane class="clickable" id="panelCloseBtn-` + this.data + `"  position="1.157 0.810 0.003" geometry="height: 0.140; width: 0.140" material="src: #closeBtn"></a-plane>
        <a-text id="title` + this.id + `" position="0 0.613 0" shader="msdf" anchor="center" width="1.5" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="#e6dfad" value="` + this.art.title + `"></a-text>
        <a-text id="author` + this.id + `" position="-0.223 0.539 0" shader="msdf" wrapCount="52" align="left" anchor="center" baseline="top" width="1" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="#fedc01" value="` + this.art.author + `"></a-text>
        <a-text id="description` + this.id + `" position="0 -0.096 0" shader="msdf" wrapCount="60" anchor="center" width="1.5" font="https://cdn.aframe.io/examples/ui/Viga-Regular.json" color="white" value="` + artDescription + `"></a-text>
        <a-plane class="clickable" id="panelNextBtn` + this.id + `" visible="false" position="1.157 0 0.003" geometry="height: 0.140; width: 0.140" material="src: #arrow; emissive: #333333"></a-plane>
        <a-plane class="clickable" id="panelPreviousBtn` + this.id + `" visible="false" rotation="0 0 180" position="-1.157 0 0.003" geometry="height: 0.140; width: 0.140" material="src: #arrow; emissive: #333333"></a-plane>
        `;

          this.frame.appendChild(entityEl);

          entityEl.addEventListener('loaded', () => {
            var description = document.querySelector('#description' + this.id);
            // hide nextBtn if single page
            if (isMultiPageDescription) {
              this.pagination.init(this.id);
            } else {
              description.setAttribute('text', {'wrapCount': 50.000});
            }

            this.infoPanelEl = entityEl;
            this.panelCloseBtn = document.getElementById('panelCloseBtn-' + this.data);
            this.panelCloseBtn.addEventListener('click', () => {
              this.closePanel();
            });
          });
        },

        createMultiPageDescription: function (artDescription) {
          let texts = [];
          let totalPages = 1;
          const splittedDesc = artDescription.split('.');
          let currentText = '';
          let currentTextLength = 0;
          if (artDescription.length > 1312) {
            // need to split into more pages
            for (let i = 0; i < splittedDesc.length; i++) {
              // select text to insert into pages
              currentText += splittedDesc[i];
              currentTextLength += splittedDesc[i].length;
              if (currentTextLength > 1312 || (i + 1 !== splittedDesc.length && currentTextLength + splittedDesc[i + 1].length > 1312) || i == splittedDesc.length - 1) {
                texts.push(currentText);
                currentText = '';
                currentTextLength = 0;
              }
            }
            totalPages = texts.length;
            console.log(texts, totalPages);
            this.pagination.setPages(texts, totalPages);

            return true;
          }
          return false;
        }

      });
    }
  }
}
