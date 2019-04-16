var modelId = "aYeBJe8M";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model");

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
  console.log("done");
});
