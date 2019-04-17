var modelId = "aYeBJe8M";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
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
var ground = new Modelo.Scene3D.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);

// Paint the ground 
var image1 = new Image();
image1.src = "/chessboard.jpg";
image1.onload = function() {
    var groundPlane = new Modelo.Scene3D.Pawn("ground1", viewer.getResourceManager(), viewer.getMaterialManager());
    groundPlane.createTexturedQuad([image1]);
    groundPlane.setScaling(40, 40, 1.0);
    groundPlane.setTranslation(0, 0, 1.01);
    viewer.getScene().addPawn(groundPlane);
}


// Put pawns on random positions
for (var i = 0; i < 10; i++) {
    var cube = new Modelo.Scene3D.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    cube.createSolidCube([1, 1, 1]);

    var x = Math.random() * 80 - 40.0;
    var y = Math.random() * 80 - 40.0;
    cube.setTranslation(x, y, 2.02);
    viewer.getScene().addPawn(cube);
}

for (var i = 0; i < 10; i++) {
    var plane = new Modelo.Scene3D.PawnBillboard("plane" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    plane.createSolidQuad([1, 0, 0]);

    var x = Math.random() * 80 - 40.0;
    var y = Math.random() * 80 - 40.0;
    plane.setTranslation(x, y, 2.02);
    viewer.getScene().addPawn(plane);
}


