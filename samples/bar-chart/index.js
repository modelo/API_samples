
const modelId = "x1qwRd8W";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

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
    
const barchart = new Modelo.Scene3D.Visualize.BarChart(viewer.getRenderScene());
viewer.getScene().addVisualize(barchart);

barchart.setParameter("xres", 50);
barchart.setParameter("yres", 50);
barchart.setPosition([-50, -100, 10]);
barchart.setScale([50, 50, 50]);

//
// Heatmap map
//
const heatmap = new Modelo.Scene3D.Visualize.HeatMap(viewer.getRenderScene());
viewer.getScene().addVisualize(heatmap);

var data = rawData.data;
for (var i = 0 ; i < data.length; i++) {
  data[i].x = parseFloat(data[i].X) / rawData.width;
  data[i].y = parseFloat(data[i].Y) / rawData.height;
}

heatmap.setParameter("points", data);
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
        viewer.invalidate();
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
