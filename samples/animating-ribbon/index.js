var modelId = "Q8PDnO8k";
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

let ribbonGroups = {};
  const plattes = {
      "path0": "warm.png",
      "path1": "cold.png"
  }
  Object.keys(gasPath).map(key => {
      let ribbonGroup = null;
      const points = gasPath[key].map(point => [point[0] / 304, point[1] / 304, point[2] / 304]);

      if (ribbonGroups[key]) {
          ribbonGroup = ribbonGroups[key].group;
      } else {
          ribbonGroup = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
          ribbonGroup.setEnabled(true);
          viewer.getScene().addVisualize(ribbonGroup);
          ribbonGroup.setParameter("width", 10);
          ribbonGroup.setParameter("unitLenght", 50);
          ribbonGroup.setParameter("speed", -0.5);
          ribbonGroup.setParameter("platteTexture", plattes[key]);
          ribbonGroups[key] = {
              group: ribbonGroup,
              ribbons: null
          };
      }
      ribbonGroups[key].ribbons = ribbonGroup.addRibbon(points);
  });





