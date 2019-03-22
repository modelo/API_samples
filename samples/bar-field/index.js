
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
    viewer.setVisualizeParameter("barField", "xres", 50);
    viewer.setVisualizeParameter("barField", "yres", 50);
    var data = new Float32Array(50 * 50);
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
            var value = Math.random();
                data[(i *50 + j)] = value;
        }
    }
    viewer.setVisualizeParameter("barField", "data", data);
    viewer.setVisualizeParameter("barField", "platteTexture", "platte.png");
    viewer.setVisualizeParameter("barField", "barSize", 0.9);
    viewer.setVisualizeEnabled("barField", true);
    viewer.setVisualizePosition("barField", [-50, -100, 10]);
    viewer.setVisualizeScale("barField", [50, 50, 50]);

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

document.getElementById("updateButton").onclick = function() {
    var data = new Float32Array(50 * 50);
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
            var value = Math.random();
                data[(i *50 + j)] = value;
        }
    }
    viewer.setVisualizeParameter("barField", "data", data);
}

document.getElementById("updateBarSize").onclick = function() {
    var barSize = Math.random();
    viewer.setVisualizeParameter("barField", "barSize", barSize);
}
