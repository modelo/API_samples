
const modelId = "g8l2v51y";
const appToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");

viewer.setSpecularIntensity(1.0);
viewer.setLightingIntensity(1.0);
    
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
const keyboard = new Modelo.View.Input.Keyboard(viewer);
viewer.addInput(keyboard);
keyboard.addKeyUpListener(keyboard => {
    if (keyboard.key === 27) {
        viewer.destroy();
    }
});
    
const barchart = new Modelo.ThreeDScene.BarChart(viewer.getRenderScene());
viewer.getScene().addVisualize(barchart);

barchart.setParameter("xres", 50);
barchart.setParameter("yres", 50);
barchart.setPosition([-50, -100, 10]);
barchart.setScale([50, 50, 50]);

var rawData = [
    {
      "x": 0.09803921568627451,
      "y": 0.5175757575757576
    },
    {
      "x": 0.22941176470588234,
      "y": 0.7109090909090909
    },
    {
      "x": 0.17294117647058824,
      "y": 0.6733333333333333
    },
    {
      "x": 0.21568627450980393,
      "y": 0.5054545454545455
    },
    {
      "x": 0.12117647058823529,
      "y": 0.6545454545454545
    },
    {
      "x": 0.04156862745098039,
      "y": 0.5212121212121212
    },
    {
      "x": 0.08392156862745098,
      "y": 0.7854545454545454
    },
    {
      "x": 0.10941176470588235,
      "y": 0.7745454545454545
    },
    {
      "x": 0.09450980392156863,
      "y": 0.6157575757575757
    },
    {
      "x": 0.10549019607843137,
      "y": 0.7303030303030303
    },
    {
      "x": 0.07333333333333333,
      "y": 0.6642424242424242
    },
    {
      "x": 0.0792156862745098,
      "y": 0.7557575757575757
    },
    {
      "x": 0.08784313725490196,
      "y": 0.7563636363636363
    }
];

//
// Heatmap map
//
const heatmap = new Modelo.ThreeDScene.Visualize.HeatMap(viewer.getRenderScene());
viewer.getScene().addVisualize(heatmap);

heatmap.setParameter("points", rawData);
heatmap.setParameter("width", 256);
heatmap.setParameter("height", 256);
heatmap.setParameter("gridSize", 64);

heatmap.getTexture();

barchart.setParameter("dataTexture", heatmap.getTexture());
barchart.setParameter("platteImage", "platte.png");
barchart.setParameter("thickness", 0.9);

viewer.loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";

}).then(() => {
    viewer.setShadowEnabled(true);

    setTimeout(() => {
        barchart.setEnabled(true);
        //volume.setEnabled(true);
    }, 2000);
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
