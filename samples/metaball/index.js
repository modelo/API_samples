
// window.onload = function() {
//     const viewer = new Modelo.View.Viewer3D(document.getElementById("model"));

//     viewer.createHeatmap();
//     // viewer.loadTileset("test", function(progress) {})
//     // .then(function(data) {
//     //     debugger;
//     // })
// }

const modelId = "x1qwRd8W";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");

viewer.addInput(new Modelo.View.Input.Mouse(viewer));
const keyboard = new Modelo.View.Input.Keyboard(viewer);
viewer.addInput(keyboard);
keyboard.addKeyUpListener(keyboard => {
  if (keyboard.key === 27) {
      viewer.destroy();
  }
});
    
// Create ground geometry
var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);

//
// Metaball image
//
var data = rawData;

const metaball = new Modelo.View.Visualize.MetaBall(viewer.getRenderScene());
metaball.setParameter("points", data);
metaball.setParameter("width", 512);
metaball.setParameter("height", 512);
metaball.setParameter("contour", true);

// Paint the ground 
var groundPlane = new Modelo.View.Pawn("ground1", viewer.getResourceManager(), viewer.getMaterialManager());
groundPlane.createTexturedQuad([metaball.getTexture()]);
groundPlane.setScaling(40, 40, 1.0);
groundPlane.setTranslation(0, 0, 1.01);
viewer.getScene().addPawn(groundPlane);

// Put pawns on random positions
for (var i = 0; i < data.length; i++) {
    var cube = new Modelo.View.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    cube.createSolidCube([1, 1, 1]);

    var x = data[i].x * 80 - 40.0;
    var y = data[i].y * 80 - 40.0;
    cube.setTranslation(x, y, 2.02);
    viewer.getScene().addPawn(cube);
}


viewer.invalidate();
