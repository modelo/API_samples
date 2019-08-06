var modelId = "G8z6zQ8j";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token
var container = document.getElementById("model");

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

document.body.appendChild(container);

var viewer = new Modelo.View.Viewer3D("model");
// init slider
$("#intensity").range({
  min: 0.0,
  max: 1.0,
  start: 0.5,
  step: 0.05,
  onChange: function(value) {
    return;
  }
});

var initiated = false;
document.getElementById("glow").onchange = function(evt) {
  var checked = document.getElementById("glow").checked;
  viewer.setEffectEnabled("Glow", checked);
  if (checked && !initiated) {
    initiated = true;

    viewer.getScene().setElementsColor(["G8z6zQ8j+0/954779"], [1.0, 1.0, 0.0]);
    viewer.getScene().setElementsColor(["G8z6zQ8j+0/701300"], [0.0, 1.0, 0.0]);
    viewer.getRenderScene().getEffect("Glow").addElements(["G8z6zQ8j+0/954779"], {
      emissiveColor: [1.0, 1.0, 0.0]
    });
    viewer.getRenderScene().getEffect("Glow").addElements(["G8z6zQ8j+0/701300"], {
      emissiveColor: [0.0, 1.0, 0.0]
    })
  }

  $("#intensity").range({
    min: 0.0,
    max: 1.0,
    start: 0.5,
    step: 0.05,
    onChange: function(value) {
      viewer.setEffectParameter("Glow", "intensity", value);
    }
  });
};
// load model
viewer.loadModel(modelId).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer));
  var keyboard = new Modelo.View.Input.Keyboard(viewer);
  viewer.addInput(keyboard);
  keyboard.addKeyUpListener(function(keyboard) {
    if (keyboard.key === 69) {
    }
  });
  console.log("done");
});
