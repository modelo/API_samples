var modelId = "m8vgM2rL";
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
  [[10552.102373, -534.26425, 0.2],
  [10530.627775, -437.69132, 0.2],
  [10467.725653, -141.901277, 0.2],
  [10431.348179, 37.52311, 0.2],
  [10375.89274, 311.074135, 0.2],
  [10323.861064, 569.169044, 0.2],
  [10291.202176, 725.253583, 0.2],
  [10286.104574, 754.831475, 0.2],
  [10277.944607, 789.524341, 0.2],
  [10252.428068, 852.772105, 0.2],
  [10195.555572, 1011.347414, 0.2],
  [10179.986964, 1054.746855, 0.2],
  [10027.952897, 1480.123648, 0.2]],
  

]

pointsArray.forEach(function(points) {
  ribbon.addRibbon(points);
});
