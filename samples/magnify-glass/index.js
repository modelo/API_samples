var modelId = "g8l2v51y";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model");

viewer.loadModel(modelId, updateProgress).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

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

  console.log("done");
});
