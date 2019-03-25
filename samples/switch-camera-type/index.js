var modelId = "g8l2v51y";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model");

document.getElementById("toggleCamera").onchange = function() {
  if (document.getElementById("toggleCamera").checked) {
    viewer.getCamera().transformToOrthogonal();
  } else {
    viewer.getCamera().transformToPerspective();
  }
  viewer.invalidate();
};

viewer.loadModel(modelId, updateProgress).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
  var keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
  viewer.addInput(keyboard);
  console.log("done");
});
