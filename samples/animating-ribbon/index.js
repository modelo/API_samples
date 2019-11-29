var modelId = "yYGeoDre";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3DDark("model", { isMobile: isMobile() });

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

    viewer.setSmartCullingEnabled(false);
  });

viewer.setLazyRenderingEnabled(false);
var ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon.setEnabled(true);
viewer.getScene().addVisualize(ribbon);
ribbon.setParameter("width", 2);
ribbon.setParameter("unitLenght", 1000);
ribbon.setParameter("speed", 1);
ribbon.setParameter("platteTexture", "./platte.png");

var pointsArray = [
  [[3432, 1485,0.3],
  [2832, 1496,0.3],
  [2205, 1495,0.3],
  [1941, 1493,0.3],
  [1910, 1482,0.3],
  [1912, 519, 0.3]],
  
  [[3386, 1580, 0.3],
  [2889,  1580, 0.3],
  [1953,  1580, 0.3],
  [1408,  1580, 0.3],
  [734,   1580, 0.3],
  [421,   1580, 0.3]],

  [[421,  1520, 0.3],
  [734,   1520, 0.3],
  [1408,  1520, 0.3],
  [1953,  1520, 0.3],
  [2889,  1520, 0.3],
  [3386,  1520, 0.3]],

  [[1913, 1483, 0.3],
  [415, 1518, 0.3]],
  
  [[3412, 1616, 0.3],
  [2826, 1610, 0.3],
  [2219, 1617, 0.3],
  [1968, 1615, 0.3],
  [1916, 1641, 0.3],
  [1944, 2242, 0.3]]
]

var ribbons = [];
pointsArray.forEach(function(points) {
  ribbons.push(ribbon.addRibbon(points));
});