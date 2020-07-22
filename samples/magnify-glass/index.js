var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.loadModel(modelId, updateProgress).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
  viewer.addInput(new Modelo.View.Input.Touch(viewer));

  var magnifyGlass = new Modelo.View.Tool.MagnifyGlass(viewer);
  viewer.addTool(magnifyGlass);

  // We should cancel magnify glass when it is used. Otherwise it
  // will intercept the mouse events always and make the camera
  // rotation disabled.
  viewer.getEventEmitter().on("MagnifyGlass-Selected", function() {
    magnifyGlass.setEnabled(false);
    document.getElementById("magnifyGlass").checked = false;
  });

  document.getElementById("magnifyGlass").onchange = function() {
    var checked = document.getElementById("magnifyGlass").checked;
    magnifyGlass.setEnabled(checked);
  };
});
