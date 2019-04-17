
// window.onload = function() {
//     const viewer = new Modelo.View.Viewer3D(document.getElementById("model"));

//     viewer.createHeatmap();
//     // viewer.loadTileset("test", function(progress) {})
//     // .then(function(data) {
//     //     debugger;
//     // })
// }

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

heatmap.setScale([50, 50, 50]);
heatmap.setPosition([0, 0, 100]);

const heightMap = new Modelo.Scene3D.Visualize.HeightMap(viewer.getRenderScene());
viewer.getScene().addVisualize(heightMap);

heightMap.setParameter("xres", 1024);
heightMap.setParameter("yres", 1024);
heightMap.setPosition([-50, -100, 10]);
heightMap.setScale([50, 50, 50]);
heightMap.setParameter("dataTexture", heatmap.getTexture());
heightMap.setParameter("platteImage", "platte.png");

viewer.loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}).then(() => {
  heightMap.setEnabled(true);
  viewer.invalidate();
    // var xRes = 32;
    // var yRes = 32;
    // var data = new Array(xRes);
    // for (var i = 0; i < xRes; i++) {
    //     data[i] = new Array(yRes);
    // }

    // rawData.forEach(function(position) {
    //     var posX = Math.floor(position.x * xRes);
    //     var posY = Math.floor(position.y * yRes);
    //     data[posX][posY] ++;
    // });

    // var buffer = new Float32Array(256 * 256);
    // var xRatio = xRes / 256;
    // var yRatio = yRes / 256;
    // for (var i = 0; i < 256; i++) {
    //     for (var j = 0; j < 256; j++) {
    //         buffer[i][j] = data[Math.floor(i * xRatio)][Math.floor(i * yRatio)];
    //     }
    // }

    // var textureBuffer = new Float32Array(2048 * 2048);
    
    // for (var i = 0; i < 256; i++) {
    //     for (var j = 0; j < 256; j++) {
    //         textureBuffer[]
    //     }
    // }

    setTimeout(() => {
        heatmap.setEnabled(true);
        //volume.setEnabled(true);
    }, 2000);

});
