var modelId = "4YkyV3rg";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

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
    viewer.getCamera().setSensitivity({"touchPan": 0.9});
    viewer.setSmartCullingEnabled(false);
    viewer.setSpecularEnabled(true);
  });

  viewer.setRenderingLinesEnabled(true);

  viewer.setBackgroundColor([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);

  if (!isMobile()) {
    viewer.setEffectEnabled("Sketch", true);
    viewer.setEffectParameter("Sketch", "color", [0 / 255.0, 239 / 255.0, 255 / 255.0]);
    viewer.setEffectParameter("Sketch", "colored", true);
    viewer.setEffectParameter("Sketch", "transparents", true);
    viewer.setEffectParameter("Sketch", "contrast", 25),
    viewer.setEffectParameter("Sketch", "detail", 10)
  }

  // Turn on SSAO effect
  viewer.setEffectEnabled("SSAO", true);
  viewer.setEffectParameter("SSAO", "transparents", true);

viewer.setLazyRenderingEnabled(false);
var ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon.setEnabled(true);
viewer.getScene().addVisualize(ribbon);
ribbon.setParameter("width", 2);
ribbon.setParameter("unitLenght", 50000);
ribbon.setParameter("speed", 0.2);
ribbon.setParameter("platteTexture", "./platte.png");

for (var key in pathes) {
  var path = pathes[key];
  path.forEach(function(point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = 1.0
  });
  ribbon.addRibbon(path);
}

viewer.setEffectParameter("Glow", "intensity", 1.2);