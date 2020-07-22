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
  var keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
  viewer.addInput(keyboard);
  keyboard.addKeyUpListener(function(keyboard) {
    if (keyboard.key === 27) {
      viewer.destroy();
    }
  });
  console.log("done");
});

var { ViewAngle } = Modelo.View;

document.getElementById("top").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.TOP);
});
document.getElementById("bottom").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.BOTTOM);
});
document.getElementById("front").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.FRONT);
});
document.getElementById("back").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.BACK);
});
document.getElementById("left").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.LEFT);
});
document.getElementById("right").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.RIGHT);
});

document.getElementById("default").addEventListener("click", function() {
  viewer.getCamera().switchToView(ViewAngle.WORLD);
});
