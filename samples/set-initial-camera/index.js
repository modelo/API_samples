var modelId = "3rjZVNr4";
var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile(),
});

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var cameraInfo = {
  at: [15.57903783461154, -25.414359459288228, 22.210090505989292],
  distance: 113.14927943427459,
  fov: 46,
  phi: -0.12480681479775713,
  theta: 4.154997199769766,
};

viewer.loadModel(modelId, { onprogress: updateProgress, cameraInfo }).then(() => {
  // model loaded successfully
  // add mouse to control camera.
  viewer.addInput(new Modelo.View.Input.Mouse(viewer));
  viewer.addInput(new Modelo.View.Input.Touch(viewer));
  // add keyboard callback.
  var keyboard = new Modelo.View.Input.Keyboard(viewer);
  viewer.addInput(keyboard);
  keyboard.addKeyUpListener((keyboard) => {
    if (keyboard.key === 27) {
      viewer.destroy();
    }
  });
});

