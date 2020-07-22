var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});

viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
  });

viewer.setEffectEnabled("DepthOfField", true);
viewer.setEffectParameter("DepthOfField", "useDepth", false);
viewer.setEffectParameter("DepthOfField", "depth", "./depth.png");
viewer.setEffectParameter("DepthOfField", "aperture", 0.025);
document.getElementById("use-image").checked = true;

document.getElementById("use-image").onchange = function(evt) {
  viewer.setEffectParameter("DepthOfField", "useDepth", !document.getElementById("use-image").checked);
};

$("#range1").range({
  min: 0,
  max: 0.1,
  start: 0,
  step: 0.0001,
  onChange: function(value) {
    viewer.setEffectParameter("DepthOfField", "aperture", value);
    viewer.invalidate();
  }
});

$("#range2").range({
  min: 0.0,
  max: 1000.0,
  start: 0.0,
  step: 1.0,
  onChange: function(value) {
    viewer.setEffectParameter("DepthOfField", "focus", value);
    viewer.invalidate();
  }
});




