var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
var container = document.getElementById("model");

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

document.body.appendChild(container);

var viewer = new Modelo.View.Viewer3D("model", {
  stencil: true,
  isMobile: isMobile()
});
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

$("#radius").range({
  min: 0.0,
  max: 5.0,
  start: 2.5,
  step: 0.05,
  onChange: function(value) {
    return;
  }
});

var initiated = false;
document.getElementById("highlight").onchange = function(evt) {
  var checked = document.getElementById("highlight").checked;
  viewer.setEffectEnabled("Highlight", checked);
  if (checked && !initiated) {
    initiated = true;

    viewer.getRenderScene().getEffect("Highlight").addElements(["3rjZVNr4+0/954779"], {
      emissiveColor: [1.0, 0.0, 0.0]
    });
    viewer.getRenderScene().getEffect("Highlight").addElements(["3rjZVNr4+0/701300"], {
      emissiveColor: [0.0, 1.0, 0.0]
    })
  }

  $("#intensity").range({
    min: 0.0,
    max: 1.0,
    start: 0.5,
    step: 0.05,
    onChange: function(value) {
      viewer.setEffectParameter("Highlight", "intensity", value);
    }
  });

  $("#radius").range({
    min: 0.0,
    max: 5.0,
    start: 2.5,
    step: 0.05,
    onChange: function(value) {
      viewer.setEffectParameter("Highlight", "radius", value);
    }
  });
};
// load model
viewer.loadModel(modelId).then(() => {
  viewer.addInput(new Modelo.View.Input.Mouse(viewer));
  viewer.addInput(new Modelo.View.Input.Touch(viewer));
  var keyboard = new Modelo.View.Input.Keyboard(viewer);
  viewer.addInput(keyboard);
  keyboard.addKeyUpListener(function(keyboard) {
    if (keyboard.key === 69) {
    }
  });
  console.log("done");
});
