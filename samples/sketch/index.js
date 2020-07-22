var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
var container = document.getElementById("model");

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

document.body.appendChild(container);

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
// init slider
$("#range1").range({
  min: 1.0,
  max: 100.0,
  start: 1.0,
  step: 1.0,
  onChange: function(value) {
    return;
  }
});
$("#range2").range({
  min: 1.0,
  max: 100.0,
  start: 30.0,
  step: 1.0,
  onChange: function(value) {
    return;
  }
});
// set details and contrast
document.getElementById("sketch").onchange = function(evt) {
  var checked = document.getElementById("sketch").checked;
  viewer.setEffectEnabled("Sketch", checked);
  $("#range1").range({
    min: 1.0,
    max: 100.0,
    start: 1.0,
    step: 1.0,
    onChange: function(value) {
      viewer.setEffectParameter("Sketch", "detail", value);
    }
  });
  $("#range2").range({
    min: 1.0,
    max: 100.0,
    start: 30.0,
    step: 1.0,
    onChange: function(value) {
      viewer.setEffectParameter("Sketch", "contrast", value);
    }
  });

  document.getElementById("sketch_color_wrapper").style.display = checked ? "block" : "none";
};
document.getElementById("sketch_color").onchange = function(evt) {
  viewer.setEffectParameter("Sketch", "colored", document.getElementById("sketch_color").checked);
};
// set sketch color
document.getElementById("Sketchcolor0").onclick = function(evt) {
  viewer.setEffectParameter("Sketch", "color", [0, 0, 0]);
};
document.getElementById("Sketchcolor128").onclick = function(evt) {
  viewer.setEffectParameter("Sketch", "color", [0.5, 0.5, 0.5]);
};
document.getElementById("Sketchcolor248").onclick = function(evt) {
  viewer.setEffectParameter("Sketch", "color", [1, 1, 1]);
};
// set surface color
document.getElementById("Surfacecolor0").onclick = function(evt) {
  viewer.setEffectParameter("Sketch", "surfaceColor", [0, 0, 0, 1.0]);
};
document.getElementById("Surfacecolor128").onclick = function(evt) {
  viewer.setEffectParameter("Sketch", "surfaceColor", [0.5, 0.5, 0.5, 1.0]);
};
document.getElementById("Surfacecolor248").onclick = function(evt) {
  viewer.setEffectParameter("Sketch", "surfaceColor", [1, 1, 1, 1.0]);
};
// load model
viewer.loadModel(modelId).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer));
  viewer.addInput(new Modelo.View.Input.Touch(viewer));
  var keyboard = new Modelo.View.Input.Keyboard(viewer);
  viewer.addInput(keyboard);
  keyboard.addKeyUpListener(function(keyboard) {
    if (keyboard.key === 69) {
    }
  });
  console.log("done");
});
