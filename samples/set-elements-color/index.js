var modelId = "G8z6zQ8j";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model");

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);

viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("loading done");

  selectElementTool.setRegionSelectEnabled(true);
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
});
