var modelId = "GY2al01b";
var appToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y"; // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

    // Add mouse control.
    var mouse = viewer.addInput(new Modelo.View.Input.Mouse(viewer));

    var cameraManipulator = new Modelo.View.Tool.CameraManipulator(viewer);
    // viewer.getCamera().setMouseZoomSpeed(10.0);

    // Add select element tool.
    var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);

    // Register the element selected event.
    var elementNames = [];
    var firstTime = true;
    viewer.getEventEmitter().on("onElementSelected", function(elementInfos) {
      if (!elementInfos || elementInfos.length === 0) {
        return;
      }
      var elementId = elementInfos[0];
      var elementIds = selectElementTool.findConnectedElements(elementId);
      selectElementTool.pick(elementIds);
      // selectElementTool.pick(elementInfos);
      // viewer.getScene().setElementsVisibility(elementInfos, false, true);

      // console.log(viewer.dumpScreen(1024, 1024));
      if (firstTime) {

        firstTime = false
      } else {

      }
      // viewer.getScene().core.setElementsColor(elementInfos, [1, 0, 0])
    });

    document.getElementById("region-select").onchange = function(evt) {
      selectElementTool.setRegionSelectEnabled(document.getElementById("region-select").checked);
    };

    var magnifyGlass = new Modelo.View.Tool.MagnifyGlass(viewer);
    // magnifyGlass.addInput(mouse);
    viewer.addTool(magnifyGlass);
    document.getElementById("select-focus").onchange = function(evt) {
      // selectElementTool.setCloseUpEnabled(document.getElementById("select-focus").checked);
      magnifyGlass.setEnabled(true);
    };


    viewer
      .loadModel(modelId, progress => {
        // second parameter is an optional progress callback
        var c = document.getElementById("progress");
      })
      .then(() => {
        viewer.getScene().setModelVisibility(modelId, true);
        viewer.setSmartCullingEnabled(true);
        // viewer.setRenderingLinesEnabled(true);

        viewer.getScene().setElementsColor(["GY2al01b+0/2954022"], [1, 0, 0]);
        viewer.getScene().setElementsColor([], null);
        viewer.getScene().setElementsColor(["GY2al01b+0/2905506"], [1, 0, 0]);
        viewer.getScene().setElementsColor(["GY2al01b+0/2954022"], null);


        cameraManipulator.setMouseZoomScaling(100.0);
      });