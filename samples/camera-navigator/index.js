var modelId = "2YDOma15";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

var cameraNavigator = new Modelo.View.Tool.CameraNavigator(viewer);
    // Add select element tool.

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
    var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });

    viewer.setSmartCullingEnabled(false);


  });


  document.getElementById("start").onclick = function() {
    var keyPoints = [
      [-70.29447174072266, -148.99954223632812, 10 + -13.434694290161133],
      [-73.63975524902344, 58.515968322753906,  10 + 9.770840644836426],
      [21.529281616210938, 39.228309631347656,  10 + 9.85794448852539],
      [12.574904441833496, -137.81053161621094, 10 + -8.65424156188964]
    ]

    cameraNavigator.setSpeed(0.5);
    cameraNavigator.setRotationDuration(20);
    cameraNavigator.clearKeyPoints();
    keyPoints.forEach(function(keyPoint) {
      cameraNavigator.addKeyPoint(keyPoint);
    });
    cameraNavigator.start();
  }

  document.getElementById("stop").onclick = function() {
    cameraNavigator.stop();
  }

  document.getElementById("resume").onclick = function() {
    cameraNavigator.resume();
  }

