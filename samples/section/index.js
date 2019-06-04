var modelId = "M15O5P8l";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsInVzZXJuYW1lIjoiZW5uZWFkIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTU1MjI5MjQxNiwiZXhwIjozMzA4ODI5MjQxNn0.ismoQ_424YAY7xTgbb9rZ7Ze7y59vJnMNAnu6UmfB5M";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model");

viewer.setSmartCullingEnabled(false);

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("done");

  var elements = ["M15O5P8l+0/938298","M15O5P8l+0/938561","M15O5P8l+0/938650","M15O5P8l+0/938798","M15O5P8l+0/938800","M15O5P8l+0/938802","M15O5P8l+0/938804","M15O5P8l+0/938830","M15O5P8l+0/938832","M15O5P8l+0/938834","M15O5P8l+0/938836","M15O5P8l+0/938864","M15O5P8l+0/938866","M15O5P8l+0/938868","M15O5P8l+0/938870","M15O5P8l+0/938898","M15O5P8l+0/938900","M15O5P8l+0/938902","M15O5P8l+0/938904","M15O5P8l+0/938932","M15O5P8l+0/938934","M15O5P8l+0/938936","M15O5P8l+0/938938","M15O5P8l+0/938968","M15O5P8l+0/938970","M15O5P8l+0/938972","M15O5P8l+0/938974","M15O5P8l+0/939036","M15O5P8l+0/939037","M15O5P8l+0/939039","M15O5P8l+0/939154","M15O5P8l+0/939252","M15O5P8l+0/939254","M15O5P8l+0/939256","M15O5P8l+0/939258","M15O5P8l+0/939260","M15O5P8l+0/939262","M15O5P8l+0/939264","M15O5P8l+0/939266","M15O5P8l+0/939268","M15O5P8l+0/939270","M15O5P8l+0/939272","M15O5P8l+0/939274","M15O5P8l+0/939276","M15O5P8l+0/939278","M15O5P8l+0/939280","M15O5P8l+0/939282","M15O5P8l+0/939284","M15O5P8l+0/939286","M15O5P8l+0/939288","M15O5P8l+0/939290","M15O5P8l+0/939292","M15O5P8l+0/939294","M15O5P8l+0/939296","M15O5P8l+0/939298","M15O5P8l+0/939300","M15O5P8l+0/939302","M15O5P8l+0/939304","M15O5P8l+0/939306","M15O5P8l+0/939310","M15O5P8l+0/939329","M15O5P8l+0/939331","M15O5P8l+0/939333","M15O5P8l+0/939335","M15O5P8l+0/939337","M15O5P8l+0/939339","M15O5P8l+0/939341","M15O5P8l+0/939343","M15O5P8l+0/939345","M15O5P8l+0/939347","M15O5P8l+0/939349","M15O5P8l+0/939351","M15O5P8l+0/939353","M15O5P8l+0/939355","M15O5P8l+0/939357","M15O5P8l+0/939359","M15O5P8l+0/939361","M15O5P8l+0/939363","M15O5P8l+0/939365","M15O5P8l+0/939367","M15O5P8l+0/939369","M15O5P8l+0/939371","M15O5P8l+0/939373","M15O5P8l+0/939375","M15O5P8l+0/939377","M15O5P8l+0/939379","M15O5P8l+0/939381","M15O5P8l+0/939383","M15O5P8l+0/939387","M15O5P8l+0/939406","M15O5P8l+0/939408","M15O5P8l+0/939410","M15O5P8l+0/939412","M15O5P8l+0/939414","M15O5P8l+0/939416","M15O5P8l+0/939418","M15O5P8l+0/939420","M15O5P8l+0/939422","M15O5P8l+0/939424","M15O5P8l+0/939426","M15O5P8l+0/939428","M15O5P8l+0/939430","M15O5P8l+0/939432","M15O5P8l+0/939434","M15O5P8l+0/939436","M15O5P8l+0/939438","M15O5P8l+0/939440","M15O5P8l+0/939442","M15O5P8l+0/939444","M15O5P8l+0/939446","M15O5P8l+0/939448","M15O5P8l+0/939450","M15O5P8l+0/939452","M15O5P8l+0/939454","M15O5P8l+0/939456","M15O5P8l+0/939458","M15O5P8l+0/939460","M15O5P8l+0/939464","M15O5P8l+0/939483","M15O5P8l+0/939485","M15O5P8l+0/939487","M15O5P8l+0/939489","M15O5P8l+0/939491","M15O5P8l+0/939493","M15O5P8l+0/939495","M15O5P8l+0/939497","M15O5P8l+0/939499","M15O5P8l+0/939501","M15O5P8l+0/939503","M15O5P8l+0/939505","M15O5P8l+0/939507","M15O5P8l+0/939509","M15O5P8l+0/939511","M15O5P8l+0/939513","M15O5P8l+0/939515","M15O5P8l+0/939517","M15O5P8l+0/939519","M15O5P8l+0/939521","M15O5P8l+0/939523","M15O5P8l+0/939525","M15O5P8l+0/939527","M15O5P8l+0/939529","M15O5P8l+0/939531"]
  // Notice that we should always add the section tool after the model is done loading.
  // Otherwise, it will cause some unexpected errors
  var section = new Modelo.View.Tool.Section(viewer);
  viewer.addTool(section);

  document.getElementById("section").onchange = function(evt) {
    var checked = document.getElementById("section").checked;
    section.setEnabled(checked);
    document.getElementById("interaction").checked = checked;
    section.setInteractive(checked);
    viewer.invalidate();
  };

  document.getElementById("interaction").onchange = function(evt) {
    section.setInteractive(document.getElementById("interaction").checked);
    viewer.invalidate();
  };
  document.getElementById("rotation").onchange = function(evt) {
    section.setRotatable(document.getElementById("rotation").checked);
    viewer.invalidate();
  };
  document.getElementById("resetSectionBox").addEventListener("click", function() {
    section.reset();
    viewer.invalidate();
  });

  document.getElementById("setSectionBox").addEventListener("click", function() {
    var bbox = section.getSectionBox();
    console.log(bbox);
  });

  document.getElementById("getSectionBox").addEventListener("click", function() {
    var bbox = [-611.513671875, -72.79178619384766, -1372.4815673828125, 611.5136108398438, -14.900945663452148, -276.3224792480469];
    section.setSectionBox(bbox);
    viewer.getScene().setElementsColor(elements, [1, 0.5, 0]);
    viewer.getScene().setElementsVisibility(elements, true);
  });
});
