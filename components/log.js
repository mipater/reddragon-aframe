AFRAME.registerComponent('log', {
    init: function () {
        console.log(this.data);
    }
});