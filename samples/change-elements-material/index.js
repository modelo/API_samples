var modelId = "q8ZjpB8a";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);
viewer.getEventEmitter().on("onPointPicked", point => {
  console.log(point);
})
viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("loading done");

  // Save the selected element names here.
  let elementNames = [];
  viewer.getEventEmitter().on("onElementSelected", elementNames1 => {
    // Restore the element's colors.
    if (elementNames.length !== 0) {
      viewer.getScene().setElementsColor(elementNames, null);
    }

    elementNames = elementNames1;
    if (elementNames1.length === 0) {
      document.getElementById("element").innerHTML = "Select element with left button: N/A";
    } else {
      document.getElementById("element").innerHTML = "Select element with left button: " + elementNames1[0];
    }
  });

  document.getElementById("random-color").onclick = function() {
    var randomColor = [Math.random(), Math.random(), Math.random()];
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        var materials = viewer.getScene().getElementMaterials(elementName);
        if (materials) {
          materials.forEach(function(material) {
            material.setDiffuse(randomColor);
          });
        }
      });
    }
  };
  document.getElementById("change-texture").onclick = function() {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        var materials = viewer.getScene().getElementMaterials(elementName);
        if (materials) {
          materials.forEach(function(material) {
            material.setDiffuseTexture("./texture.jpg");
          });
        }
      });
    }
  };
});
