let appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

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
    
// Create the volume data.
let totalImageCount = 1426;
let textureBuffer = new Uint8Array(totalImageCount * 512 * 512);
textureBuffer.fill(255);

let canvas = document.createElement('canvas');

canvas.width = 512;
canvas.height = 512;
let volume = null;
let count = 0;
for (let i = 0; i < 1426; i++) {
    let img = new Image();
    img.src = "https://test-1253875267.cos.ap-shanghai.myqcloud.com/images/IMG" + (i + 1) + ".jpg";
    img.onload = () => {
        canvas.getContext('2d').drawImage(img, 0, 0, 512, 512);
        let pixelData = canvas.getContext('2d').getImageData(0, 0, 512, 512).data;
        for (let j = 0; j < 512; j++) {
            for (let k = 0; k < 512; k++) {
                textureBuffer[i * 512 * 512 + j * 512 + k] = pixelData[(j * 512 + k) * 4];
                // textureBuffer[i * 512 * 512 + j * 512 + k] = 512 - Math.sqrt(j * j + k * k)
            }
        }

        count ++;
        if (count === totalImageCount) {

            volume = new Modelo.View.Visualize.VolumeTexture3D(viewer.getRenderScene());
            viewer.getScene().addVisualize(volume);
            
            volume.setParameter("data", { "data": textureBuffer, "width": 512, "height": 512, "depth": totalImageCount} );
            volume.setParameter("platteImage", "platte.png");
            volume.setParameter("gradientImage", "density.png");
            volume.setScaling([50, 50, 100]);
            volume.setPosition([0, 0, 7.7]);
            
            // Create ground geometry
            let ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
            ground.createSolidCube();
            ground.setDiffuseColor([0, 0, 0]);
            ground.setScaling(100, 100, 0.25);
            ground.setTranslation(0, 0, -50);
            viewer.getScene().addPawn(ground);
                    
            volume.setEnabled(true);
            
        }
    }
}

$("#range1").range({
    min: 0,
    max: 1,
    start: 0.0,
    step: 0.01,
    onChange: function(value) {
        if (volume) {
            volume.setParameter("threshold", value);
            viewer.invalidate();
        }
    }
  });

viewer.setBackgroundColor([0, 0, 0, 1]);

// for (let i = 0; i < 2048; i++) {
//     for (let j = 0; j < 2048; j++) {
//         let distance = Math.sqrt(Math.pow((i - 1024), 2) + Math.pow((j - 1024), 2));
//         textureBuffer[i * 2048 + j] = Math.max(0.0, 1 - distance / 512 * 256);
//     }
// }

