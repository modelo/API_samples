var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
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
metaball.setParameter("points", data.slice(0, 3));
metaball.setParameter("width", 1024);
metaball.setParameter("height", 1024);
metaball.setParameter("contour", true);
metaball.setParameter("contourColor", [1, 0, 0, 1.0]);
metaball.setParameter("backgroundColor", [1, 1, 1, 0.0]);
metaball.setParameter("color", [1.0, 0.45, 0.45, 1.0]);

// Paint the ground 
const groundPlane = new Modelo.View.Pawn("ground1", viewer.getResourceManager(), viewer.getMaterialManager());
groundPlane.createTexturedQuad([metaball.getTexture()]);
groundPlane.setScaling(40, 40, 1.0);
groundPlane.setTranslation(0, 0, 1.01);
viewer.getScene().addPawn(groundPlane);

const metaball2 = new Modelo.View.Visualize.MetaBall(viewer.getRenderScene());
metaball2.setParameter("points", data.slice(3, data.length));
metaball2.setParameter("width", 1024);
metaball2.setParameter("height", 1024);
metaball2.setParameter("contour", true);
metaball2.setParameter("contourColor", [0, 0, 1, 1.0]);
metaball2.setParameter("backgroundColor", [1, 1, 1, 0.0]);
metaball2.setParameter("color", [0.45, 0.45, 1.0, 1.0]);

// Paint the ground 
const groundPlane2 = new Modelo.View.Pawn("ground2", viewer.getResourceManager(), viewer.getMaterialManager());
groundPlane2.createTexturedQuad([metaball2.getTexture()]);
groundPlane2.setScaling(40, 40, 1.0);
groundPlane2.setTranslation(0, 0, 1.01);
viewer.getScene().addPawn(groundPlane2);

// Put pawns on random positions
for (let i = 0; i < data.length; i++) {
    const cube = new Modelo.View.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    cube.createSolidCube([0.8, 0.8, 0.8]);
    const x = data[i].x * 80 - 40.0;
    const y = data[i].y * 80 - 40.0;
    cube.setTranslation(x, y, 2.013);
    cube.setScaling(0.6, 0.6, 0.6);
    viewer.getScene().addPawn(cube);
}

viewer.invalidate();

document.getElementById("enable-foreground").onclick = function() {
    metaball2.setParameter("foregroundImage", "./foreground.png");
}