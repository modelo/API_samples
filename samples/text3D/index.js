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

var text = new Modelo.View.Text3D("text1", viewer.getResourceManager(), viewer.getMaterialManager());
text.setContent("Hello World!!");
text.setTranslation(0, 0, 10);
text.setScaling(10, 10, 10);
viewer.getScene().addText3D(text);

var text = new Modelo.View.Text3DBillboard("text2", viewer.getResourceManager(), viewer.getMaterialManager());
text.setContent("Hello World!!");
text.setTranslation(0, 0, 20.0);
text.setScaling(10, 10, 10);
text.setColor([0.0, 0.9, 0.2]);
viewer.getScene().addText3D(text);

var text = new Modelo.View.Text3DBillboard("text3", viewer.getResourceManager(), viewer.getMaterialManager());
text.setContent("Hello World!!");
text.setTranslation(0, 0, 30);
text.setScaling(10, 10, 10);
text.setColor([1, 0.3, 0.2]);
text.setFaceCameraZ(true);
viewer.getScene().addText3D(text);


