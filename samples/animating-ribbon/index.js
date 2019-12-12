var modelId = "z8AP9mYX";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInVzZXJuYW1lIjoid2FuZ2p1bnJlbiIsImlhdCI6MTU0ODI5NDMxMSwiZXhwIjozMzA4NDI5NDMxMX0.Ruz4m7XJAyYQRNDsFeJEd8Z44UqotOA-CPau4q91G2Y"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3DDark("model", { isMobile: isMobile() });
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);

viewer.setRenderingLinesEnabled(true);
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

    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);
    selectElementTool.setCloseUpEnabled(false);
    selectElementTool.setHighlightEnabled(false);

    //通过使用鼠标点击事件，来获得鼠标在三维中的位置,然后把返回的点放入关键帧点列中
    viewer.getEventEmitter().on("onPointPicked", point => {
      console.log(point);
    })

    viewer.setSmartCullingEnabled(false);
  });

viewer.setLazyRenderingEnabled(false);
var ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon.setEnabled(true);
viewer.getScene().addVisualize(ribbon);
ribbon.setParameter("width", 300);
ribbon.setParameter("unitLenght", 20);
ribbon.setParameter("speed", 0.5);
ribbon.setParameter("platteTexture", "./arrowLine.png");

var pointsArray = [
   [[223.88925170898438, 177.96585083007812, -5.224310398101807],
  [223.94088745117188, 213.5816192626953, -5.258899688720703]]
]

var ribbons = [];
pointsArray.forEach(function(points) {
  ribbons.push(ribbon.addRibbon(points));
});