
// window.onload = function() {
//     const viewer = new Modelo.View.Viewer3D(document.getElementById("model"));

//     viewer.createHeatmap();
//     // viewer.loadTileset("test", function(progress) {})
//     // .then(function(data) {
//     //     debugger;
//     // })
// }

const modelId = "g8l2v51y";
const appToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");
viewer.setSpecularIntensity(1.0);
viewer.setLightingIntensity(1.0);
viewer.setShadowEnabled(true);
viewer.loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";

}).then(() => {
    viewer.addVisualize("volume");

    var textureBuffer = new Float32Array(2048 * 2048);
    var maxLength = Math.sqrt(128 * 128 * 2);
    for (var i = 0; i < 2048; i++) {
        for (var j = 0; j < 2048; j++) {
            var distance = Math.sqrt(Math.pow(i % 256 - 128, 2) + Math.pow(j % 256 - 128, 2)) / (Math.floor(i / 256) * 8 + j / 256) * 64;
            textureBuffer[i * 2048 + j] = 1 - distance / maxLength;
            // var distance = Math.sqrt(Math.pow((i - 1024), 2) + Math.pow((j - 1024), 2));
            // textureBuffer[i * 2048 + j] = 1 - distance / maxLength;
        }
    }
    viewer.setVisualizeParameter("volume", "sliceData", textureBuffer);
    viewer.setVisualizeParameter("volume", "platteTexture", "platte.png");
    viewer.setVisualizeParameter("volume", "sliceNumber", 64);
    viewer.setVisualizeEnabled("volume", true);
    viewer.setVisualizePosition("volume", [-50, -100, 10]);
    viewer.setVisualizeScale("volume", [50, 50, 100]);

    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    // add keyboard callback.
    const keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
        if (keyboard.key === 27) {
            viewer.destroy();
        }
    });
});
