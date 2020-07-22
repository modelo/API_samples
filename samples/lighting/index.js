var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

document.getElementById("specular").onchange = function(evt) {
  viewer.setSpecularEnabled(document.getElementById("specular").checked);
};
document.getElementById("shadow").onchange = function(evt) {
  viewer.setShadowEnabled(document.getElementById("shadow").checked);
};
document.getElementById("ao").onchange = function(evt) {
  viewer.setEffectEnabled("SSAO", document.getElementById("ao").checked);
};

$("#range1").range({
  min: 0,
  max: Math.PI,
  start: 1.0,
  step: 0.01,
  onChange: function(value) {
    viewer.setLightingLatitude(value);
  }
});
$("#range2").range({
  min: 0,
  max: 2.0 * Math.PI,
  start: 1.0,
  step: 0.01,
  onChange: function(value) {
    viewer.setLightingLongitude(value);
  }
});
$("#range3").range({
  min: 0,
  max: 1,
  start: 0.5,
  step: 0.01,
  onChange: function(value) {
    viewer.setLightingIntensity(value);
  }
});

viewer.loadModel(modelId, updateProgress).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
  viewer.addInput(new Modelo.View.Input.Touch(viewer));
  console.log("done");
});
