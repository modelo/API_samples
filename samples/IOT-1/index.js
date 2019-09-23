const modelId = "aYewwarM";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

document.body.appendChild(document.getElementById("model"));

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

$("#intensity1").range({
    min: 0.0,
    max: 1.0,
    start: 0.5,
    step: 0.05,
    onChange: function(value) {
      return;
    }
  });

$("#intensity2").range({
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

const viewer = new Modelo.View.Viewer3DDark("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

const selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);
viewer.getEventEmitter().on("onPointPicked", point => {
  console.log(point);
})

let initiated = false;
let names = [];
document.getElementById("highlight").onchange = function(evt) {
  const highlightChecked = document.getElementById("highlight").checked;
  viewer.setEffectEnabled("Highlight", highlightChecked);
  if (highlightChecked && !initiated) {
      initiated = true;
      viewer.getRenderScene().getEffect("Highlight").addElements(names, {
        emissiveColor: [1.0, 0.0, 0.0]
      });
  }

  $("#intensity2").range({
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
}

document.getElementById("glow").onchange = function(evt) {
  const checked = document.getElementById("glow").checked;
  viewer.setEffectEnabled("Glow", checked);
  if (checked && !initiated) {
    initiated = true;
    viewer.getScene().setElementsColor(item, [1.0, 1.0, 0.0]);
    viewer.getRenderScene().getEffect("Glow").addElements(names, {
      emissiveColor: [1.0, 1.0, 0.0]
    });
  }
  $("#intensity1").range({
      min: 0.0,
      max: 1.0,
      start: 0.5,
      step: 0.05,
      onChange: function(value) {
          viewer.setEffectParameter("Glow", "intensity", value);
      }
  });
}

viewer.loadModel(modelId, updateProgress).then(() => {
  names = viewer.getScene().getElementsNames().filter((item, index) => index % 1000 === 0);
  for (let i = 0; i < names.length; i++) {
    const element = document.createElement('li');
    element.innerHTML = names[i];
    element.classList = 'list-group-item';
    $('#elements .list-group').append(element);
  }
});

