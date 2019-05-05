var modelId = "G8z6zQ8j";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token
Modelo.Auth.signIn(
  appToken,
  function() {
    var canvas = document.getElementById("model");
    var viewer = new Modelo.View.Viewer3D(canvas, false, 1280, 800);

    // Add mouse control.
    var mouse = viewer.addInput(new Modelo.View.Input.Mouse(canvas));

    // Add select element tool.
    var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);

    // Register the element selected event.
    var elementNames = [];
    viewer.getEventEmitter().on("onElementSelected", function(elementInfos) {
      console.log(elementInfos);
      elementNames = [];
      elementInfos.forEach(function(elementInfo) {
        var elementName = elementInfo.modelId + "+" + elementInfo.fileName + "/" + elementInfo.elementName;
        elementNames.push(elementName);
      });
    });

    document.getElementById("region-select").onchange = function(evt) {
      selectElementTool.setRegionSelectEnabled(document.getElementById("region-select").checked);
    };

    document.getElementById("select-focus").onchange = function(evt) {
      selectElementTool.setCloseUpEnabled(document.getElementById("select-focus").checked);
    };

    var modelId = "5roeqpYL"; // Check out the model ID in the project page.
    viewer.loadModel(
      modelId, // Load the model into the viewer.
      null,
      function() {
        // success
        console.log("loading done");
      },
      function(errmsg) {
        // fail
        console.error(errmsg);
      },
      function(per) {
        // on progress
        console.log("download completes " + Math.round(per * 100) + "%");
      }
    );
  },
  function(err) {
    console.log(err);
  }
);
