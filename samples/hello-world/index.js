var modelId = "M15O5P8l";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsInVzZXJuYW1lIjoiZW5uZWFkIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTU1MjI5MjQxNiwiZXhwIjozMzA4ODI5MjQxNn0.ismoQ_424YAY7xTgbb9rZ7Ze7y59vJnMNAnu6UmfB5M";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");


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
  });

  // viewer
  // .loadModel("q8ZLDJ1a", progress => {
  // })