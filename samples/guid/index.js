var modelId = "Z8WqeV1A";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

// Add mouse control.
var mouse = viewer.addInput(new Modelo.View.Input.Mouse(viewer));

// Add select element tool.
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);

// Register the element selected event.
viewer.getEventEmitter().on("onElementSelected", function(elementNames) {
    var elementGuids = "";
    elementNames.forEach(function(elementName) {
        var guid = viewer.getScene().getElementGuid(elementName);
        elementGuids += "\n" + guid;
    });

    document.getElementById("selected-guid").value = elementGuids;
});

document.getElementById("guid-button").onclick = () => {
    var guid = document.getElementById("guid-value").value;
    
    var elementName = viewer.getScene().getElementNameByGuid(guid);
    if (elementName) {
        selectElementTool.pick([elementName], true);
    }
};

viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
      console.log("loading done");
  });
