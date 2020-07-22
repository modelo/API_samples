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
  at: [-1.5187797546386712, -48.585296630859354, -6.135294914245603],
  distance: 394.86188948912456,
  fov: 46,
  phi: 0.8927329251994189,
  theta: 5.627387143782212,
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

function step() {
  const camera = viewer.getRenderScene().getCamera();
  camera.rotate(2, 0);
  viewer.invalidate();
  requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

