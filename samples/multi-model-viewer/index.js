var modelId1 = "j1mXXDrb";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

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

var modelId2 = "Vr4BBRYg";
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
