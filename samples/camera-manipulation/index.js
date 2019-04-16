var modelId = "aYeBJe8M";
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
