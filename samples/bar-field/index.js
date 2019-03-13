
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
viewer.loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";

}).then(() => {
    viewer.setShadowEnabled(true);

    viewer.addVisualize("barField");
    viewer.setVisualizeParameter("barField", "width", 50);
    viewer.setVisualizeParameter("barField", "height", 50);
    var data = new Uint8Array(50 * 50 * 24);
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
            var value = Math.random() * 255;
            value = Math.sqrt((i - 25) * (i - 25) + (j - 25) * (j - 25)) * 7;
            for (var k = 0; k < 24; k++) {
                data[(i *50 + j) * 24 + k] = value;
            }
        }
    }
    viewer.setVisualizeParameter("barField", "data", data);
    viewer.setVisualizeParameter("barField", "platteTexture", "platte.png")
    viewer.setVisualizeEnabled("barField", true);
    viewer.setVisualizePosition("barField", [-50, -100, 10]);

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
