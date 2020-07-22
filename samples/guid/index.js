var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

// Add mouse control.
var mouse = viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));

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
