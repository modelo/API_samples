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
    
const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
viewer.getScene().addVisualize(heatmap);
heatmap.setParameter("width", 256);
heatmap.setParameter("height", 256);
heatmap.setParameter("gridSize", 32);

var data = [];
var imageDatas = [];
for (var i = 0; i < 64; i++) {
    
    for (var j = 0; j < 20; j++) {
        data[j] = {
            x: Math.random(),
            y: Math.random(),
            number: Math.random() * 10
        }
    }
    heatmap.setParameter("points", data);
    var imageData = heatmap.getImageData();
    imageDatas.push(new Float32Array(imageData));
}

var volumeRenderingData = new Float32Array(2048*1536);
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 8; j++) {
        // var offset = i * 256 * 256 * 8 + j * 256 * 256;
        for (var ii = 0; ii < 256; ii++) {
            for (var jj = 0; jj < 256; jj++) {
                volumeRenderingData[i * 256 * 256 * 8 + ii * 256 * 8 + j * 256 + jj] = imageDatas[i * 8 + j][ii * 256 + jj];

                if (ii > 56 && ii < 200 && jj > 56 && jj < 200) {
                    volumeRenderingData[i * 256 * 256 * 8 + ii * 256 * 8 + j * 256 + jj] = 0;
                }
            }
        }
    }
}

const volume = new Modelo.View.Visualize.MultiLayerVolume(viewer.getRenderScene());
viewer.getScene().addVisualize(volume);

volume.setParameter("gridSize", [8, 6]); // Set the grid size of the texture.
volume.setParameter("platteImage", "platte.png");
volume.setParameter("data", { "data": volumeRenderingData, "width": 2048, "height": 1536 });
volume.setParameter("layers", 48); // total layers of data
volume.setScaling([10, 10, 20]);
volume.setPosition([0, 0, 7.7]);
volume.setRotation([0, 0, 1], 0.5);
// Create ground geometry
var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(25, 25, 0.25);
viewer.getScene().addPawn(ground);
        
volume.setEnabled(true);
