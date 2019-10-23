var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
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

viewer.setRenderingLinesEnabled(true);

// The ground.
var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);

// Paint the ground 
var image1 = new Image();
image1.src = "/chessboard.jpg";
image1.onload = function() {
    var groundPlane = new Modelo.View.Pawn("ground1", viewer.getResourceManager(), viewer.getMaterialManager());
    groundPlane.createTexturedQuad([image1]);
    groundPlane.setScaling(40, 40, 1.0);
    groundPlane.setTranslation(0, 0, 1.01);
    viewer.getScene().addPawn(groundPlane);
}

// Put pawns on random positions
for (var i = 0; i < 10; i++) {
    var cube = new Modelo.View.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    cube.createSolidCube([1, 1, 1]);

    var x = Math.random() * 80 - 40.0;
    var y = Math.random() * 80 - 40.0;
    cube.setTranslation(x, y, 2.02);
    viewer.getScene().addPawn(cube);
}

// FIXME: PawnBillboard is not enabled so far.
for (var i = 0; i < 10; i++) {
    var plane = new Modelo.View.PawnBillboard("plane" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    plane.createSolidQuad([1, 0, 0]);

    var x = Math.random() * 80 - 40.0;
    var y = Math.random() * 80 - 40.0;
    plane.setTranslation(x, y, 2.02);
    viewer.getScene().addPawn(plane);
}


