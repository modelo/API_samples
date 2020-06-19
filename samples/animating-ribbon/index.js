var modelId = "DY0q4e8x";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3DDark("model", { isMobile: isMobile() });
//var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
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
ribbon.setParameter("width", 20);
ribbon.setParameter("unitLenght", 30);
ribbon.setParameter("speed", -0.5);
ribbon.setParameter("platteTexture", "./warm.png");

var ribbon2= new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon2.setEnabled(true);
viewer.getScene().addVisualize(ribbon2);
ribbon2.setParameter("width", 8);
ribbon2.setParameter("unitLenght", 30);
ribbon2.setParameter("speed", 0.5);
ribbon2.setParameter("platteTexture", "./cold.png");

var ribbons = [];
var ribbons2 = [];
pointsArray.forEach(function(points) {
  ribbons.push(ribbon.addRibbon(points));
});

pointsArray2.forEach(function(points) {
  ribbons2.push(ribbon2.addRibbon(points));
});