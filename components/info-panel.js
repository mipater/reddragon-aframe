AFRAME.registerComponent('info-panel', {
  schema: {type: 'string'},

  init: function () {
    console.log(this.data);
    this.system = document.querySelector('a-scene').systems['data-manager'];
    this.arts = this.system.getArts();
    // var panelBtn = document.querySelectorAll('.panel-btn');

    // this.onPanelBtnClick = this.onPanelBtnClick.bind(this);

    // panelBtn.forEach(btn => {
    //   btn.addEventListener('click', this.onPanelBtnClick);
    // })

  },

  events: {
    click: function (evt) {
      console.log('This entity was clicked!');
      this.el.setAttribute('material', 'color', 'red');
    }
  },

  // onPanelBtnClick: function (e) {
  //   console.log('clicked');
  // },

  // remove: function () {
  //   panelBtn.forEach(btn => {
  //     btn.removeEventListener('click', this.onPanelBtnClick);
  //   })
  // }
  
});

