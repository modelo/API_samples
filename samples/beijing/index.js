var modelId = "GY2KwW8b";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1NTIwMTIyMTksImV4cCI6MzMwODgwMTIyMTl9.Fb-AKOuaWYxwIMmyu3T6GENkUrbP8J21MffB78IpXU0";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

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
    viewer.setSmartCullingEnabled(false);
    viewer.setSpecularEnabled(true);
  });

  viewer.setRenderingLinesEnabled(true);

  viewer.setBackgroundColor([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);

  viewer.setEffectEnabled("Sketch", true);
  viewer.setEffectParameter("Sketch", "color", [0.0 / 255.0, 255.0 / 255.0, 243.0 / 255.0]);
  viewer.setEffectParameter("Sketch", "colored", true);
  //this.setEffectParameter("Sketch", "surfaceColor", [51.0 / 255.0, 145.0 / 255.0, 1.0, 0.2]);
  viewer.setEffectParameter("Sketch", "transparents", true);

  // Turn on SSAO effect
  viewer.setEffectEnabled("SSAO", true);
  viewer.setEffectParameter("SSAO", "transparents", true);

viewer.setLazyRenderingEnabled(false);
var ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon.setEnabled(true);
viewer.getScene().addVisualize(ribbon);
ribbon.setParameter("width", 2);
ribbon.setParameter("unitLenght", 1000);
ribbon.setParameter("speed", 3);
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

  [[1913, 1483, 0.3]
  [415, 1518, 0.3]],
  
  [[3412, 1616, 0.3],
  [2826, 1610, 0.3],
  [2219, 1617, 0.3],
  [1968, 1615, 0.3],
  [1916, 1641, 0.3],
  [1944, 2242, 0.3]]
]

pointsArray.forEach(function(points) {
  ribbon.addRibbon(points);
});
