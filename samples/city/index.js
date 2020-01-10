var modelId = "zY7P6G87";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", { isMobile: isMobile() });

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

    viewer.getCamera().setSensitivity({ "touchPan": 0.9 });

    viewer.setSmartCullingEnabled(false);
    viewer.setSpecularEnabled(true);

    var images = ["./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg"];
    viewer.setReflectionMap(images, () => {
      viewer._materialManager._materials["zY7P6G87mat2"].setReflectionIntensity(0.1); //topomesh
      viewer._materialManager._materials["zY7P6G87mat3"].setReflectionIntensity(0.2); //watersurf
      viewer._materialManager._materials["zY7P6G87mat4"].setReflectionIntensity(0.7); //bdg-glow
      viewer._materialManager._materials["zY7P6G87mat5"].setReflectionIntensity(0.2); //bdg>80a
      viewer._materialManager._materials["zY7P6G87mat6"].setReflectionIntensity(0.2); //bdg>80b
      viewer._materialManager._materials["zY7P6G87mat7"].setReflectionIntensity(0.2); //bdg<80
      viewer._materialManager._materials["zY7P6G87mat8"].setReflectionIntensity(0.2); //bdg<40
    });
  });


viewer.setRenderingLinesEnabled(true);

// viewer.setEffectEnabled("DepthOfField", true);
// viewer.setEffectParameter("DepthOfField", "useDepth", false);
// viewer.setEffectParameter("DepthOfField", "depth", "./depth.png");
// viewer.setEffectParameter("DepthOfField", "aperture", 0.025);

viewer.setBackgroundMode(Modelo.View.ViewBackground.EQUIRECTANGLE);
viewer.setBackgroundImage("background.jpg");

viewer.setLazyRenderingEnabled(false);
var stripe1 = new Modelo.View.Visualize.AnimatingStripe(viewer.getRenderScene());
stripe1.setEnabled(true);
viewer.getScene().addVisualize(stripe1);
stripe1.setParameter("width", 100);
stripe1.setParameter("unitLenght", 100000);
stripe1.setParameter("speed", 0.2);
stripe1.setParameter("platteTexture", "./traffic_02.png");

for (var key in pathes1) {
  var path = pathes1[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808+30
  });
  stripe1.addStripe(path);
}

var stripe2 = new Modelo.View.Visualize.AnimatingStripe(viewer.getRenderScene());
stripe2.setEnabled(true);
viewer.getScene().addVisualize(stripe2);
stripe2.setParameter("width", 100);
stripe2.setParameter("unitLenght", 100000);
stripe2.setParameter("speed", 0.2);
stripe2.setParameter("platteTexture", "./traffic_04.png");

for (var key in pathes2) {
  var path = pathes2[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808+15;
  });
  stripe2.addStripe(path);
}

// var stripe3 = new Modelo.View.Visualize.AnimatingStripe(viewer.getRenderScene());
// stripe3.setEnabled(true);
// viewer.getScene().addVisualize(stripe3);
// stripe3.setParameter("width", 200);
// stripe3.setParameter("unitLenght", 40000);
// stripe3.setParameter("speed", 0.3);
// stripe3.setParameter("platteTexture", "./traffic_04.png");

// for (var key in pathes3) {
//   var path = pathes3[key];
//   path.forEach(function (point) {
//     //meter to feet.
//     point[0] = point[0] * 3.2808;
//     point[1] = point[1] * 3.2808;
//     point[2] = point[2] * 3.2808;
//   });
//   stripe3.addStripe(path);
// }


var ribbon3 = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon3.setEnabled(true);
viewer.getScene().addVisualize(ribbon3);
ribbon3.setParameter("width", 2);
ribbon3.setParameter("unitLenght", 60000);
ribbon3.setParameter("speed", 0.2);
ribbon3.setParameter("platteTexture", "./platteMetro.png");

for (var key in pathes3) {
  var path = pathes3[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808
  });
  ribbon3.addRibbon(path);
  // break;
}

viewer.setEffectParameter("Glow", "intensity", 0.4);