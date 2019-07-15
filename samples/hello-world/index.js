var modelId = "z8AlmqYX";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: false
});


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
    
viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });

    viewer.getScene().setModelVisibility(modelId, true);
    viewer.setSmartCullingEnabled(true);

    viewer.setEffectEnabled("SSAO", true);
  });

  // viewer
  // .loadModel("q8ZLDJ1a", progress => {
  // })