var modelId = "2YDqqX85";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
viewer.setRenderingLinesEnabled(true);
viewer.loadModel(modelId, progress => {
  // /assets/js/utils.js
  updateProgress(progress);
  })
  .then(() => {
    const bbox = [-101.78817749023438, -83.82557678222656, -180.5775146484375, 101.7881851196289, -54.82966232299805, -96.28856658935547];
    setDarkTheme(viewer);
    viewer.addTool(new Modelo.View.Tool.Section(viewer));
    const sectionTool = viewer.getTool('Section');
    sectionTool.setEnabled(true);
    sectionTool.setSectionBox(bbox);

    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
    viewer.setSmartCullingEnabled(false);
  });

  viewer.setLazyRenderingEnabled(false);
  const ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  ribbon.setEnabled(true);
  viewer.getScene().addVisualize(ribbon);
  ribbon.setParameter("width", 2);
  ribbon.setParameter("unitLenght", 1000);
  ribbon.setParameter("speed", 1);
  ribbon.setParameter("platteTexture", "platte.png");
  let pointsArray = [];
  for (const key in escapePathData) {
    pointsArray.push(escapePathData[key]);
  }
  pointsArray.forEach(function(points) {
    points.forEach(function(point) {
      point[0] = point[0] / 304;
      point[1] = point[1] / 304;
      point[2] = 1.8
    });
    ribbon.addRibbon(points);
  });
  ribbon.setScaling(1.6, 0.6, 0.6);

