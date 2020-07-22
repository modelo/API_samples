var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.setSmartCullingEnabled(false);

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("done");

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
});
