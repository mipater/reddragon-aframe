AFRAME.registerComponent('info-panel', {
  schema: {type: 'string'},

  init: function() {
    console.log(this.data);
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
    let entityEl = document.createElement('a-entity');

    // set panel position from intersection point
    entityEl.setAttribute('position', {x: intersectionPoint.x-0.9, y: intersectionPoint.y, z: intersectionPoint.z+0.285});
    entityEl.setAttribute('geometry', {primitive: 'plane', width: 1.5, height: 1.8});
    entityEl.setAttribute('material', {color: '#333333', shader: 'flat', transparent: false})
    entityEl.innerHTML = '<a-entity id="movieTitle" position="-0.68 -0.1 0" text="shader: msdf; anchor: left; width: 1.5; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Ponyo (2003)"></a-entity>';
    sceneEl.appendChild(entityEl);
    entityEl.addEventListener('loaded', () => {
      this.infoPanelEl = entityEl;
    })
  }
  
});

