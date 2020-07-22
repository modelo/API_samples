var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
var HiddenElements = [];

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
    /*if (elementNames.length !== 0) {
      viewer.getScene().setElementsColor(elementNames, null);
    }*/

    elementNames = elementNames1;
    if (elementNames1.length === 0) {
      document.getElementById("element").innerHTML = "Select element with left button: N/A";
    } else {
      document.getElementById("element").innerHTML = "Select element with left button: " + elementNames1[0];
    }
  });

  document.getElementById("default").onclick = function() {
    viewer.getScene().setElementsColor(elementNames, null);
  };
  
  document.getElementById("red").onclick = function() {
    viewer.getScene().setElementsColor(elementNames, [1, 0, 0]);
  };
  document.getElementById("green").onclick = function() {
    viewer.getScene().setElementsColor(elementNames, [0, 1, 0]);
  };
  document.getElementById("blue").onclick = function() {
    viewer.getScene().setElementsColor(elementNames, [0, 0, 1]);
  };
  document.getElementById("hide").onclick = function() {
    HiddenElements.push(elementNames);
    viewer.getScene().setElementsVisibility(elementNames, false);
  };
  document.getElementById("show").onclick = function() {
    HiddenElements.forEach(element => {
      viewer.getScene().setElementsVisibility(element, true);
    });
  };
});
