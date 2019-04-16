var modelId1 = "aYeBJe8M";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer1 = new Modelo.View.Viewer3D("model1");
viewer1
  .loadModel(modelId1, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer1.addInput(new Modelo.View.Input.Mouse(viewer1));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer1);
    viewer1.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer1.destroy();
      }
    });
  });

var modelId2 = "aYeBJe8M";
var viewer2 = new Modelo.View.Viewer3D("model2");
viewer2
  .loadModel(modelId2, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer2.addInput(new Modelo.View.Input.Mouse(viewer2));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer2);
    viewer2.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer2.destroy();
      }
    });
  });
