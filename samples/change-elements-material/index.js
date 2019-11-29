var modelId = "GY2KL28b";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInVzZXJuYW1lIjoid2FuZ2p1bnJlbiIsImlhdCI6MTU0ODI5NDMxMSwiZXhwIjozMzA4NDI5NDMxMX0.Ruz4m7XJAyYQRNDsFeJEd8Z44UqotOA-CPau4q91G2Y"

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

viewer.setEffectEnabled("Sketch", true);
viewer.setEffectParameter("Sketch", "colored", true);
viewer.setShadowEnabled(true);
viewer.setEffectEnabled("SSAO", true);

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
    if (elementNames.length == 0){
      window.alert("Please select an element first.");
    }
  };

  document.getElementById("thumbnail1").addEventListener('click',function(event) {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        var materials = viewer.getScene().getElementMaterials(elementName);
        if (materials) {
          materials.forEach(function(material) {
            material.setDiffuseTexture("./texture.jpg");
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  });

  document.getElementById("thumbnail2").addEventListener('click',function(event) {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        var materials = viewer.getScene().getElementMaterials(elementName);
        if (materials) {
          materials.forEach(function(material) {
            material.setDiffuseTexture("./texture 2.jpg");
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  });

  document.getElementById("thumbnail3").addEventListener('click',function(event) {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        var materials = viewer.getScene().getElementMaterials(elementName);
        if (materials) {
          materials.forEach(function(material) {
            material.setDiffuseTexture("./texture 3.jpg");
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  });

  
});