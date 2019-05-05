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
    
// Create the volume data.
var textureBuffer = new Float32Array(2048 * 2048);
for (var i = 0; i < 2048; i++) {
    for (var j = 0; j < 2048; j++) {
        var distance = Math.sqrt(Math.pow((i - 1024), 2) + Math.pow((j - 1024), 2));
        textureBuffer[i * 2048 + j] = Math.max(0.0, 1 - distance / 512);
    }
}

const volume = new Modelo.Scene3D.Visualize.Volume(viewer.getRenderScene());
viewer.getScene().addVisualize(volume);

volume.setParameter("data", { "data": textureBuffer, "width": 2048, "height": 2048} );
volume.setParameter("platteImage", "platte.png");
volume.setParameter("gradientImage", "density.png");
volume.setScaling([50, 50, 15]);
volume.setPosition([0, 0, 7.7]);

// Create ground geometry
var ground = new Modelo.Scene3D.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(25, 25, 0.25);
viewer.getScene().addPawn(ground);
        
// Delay the volume rendering until the texture is loaded.
setTimeout(() => {
    volume.setEnabled(true);
}, 2000);

