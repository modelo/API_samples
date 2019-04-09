
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

heatmap.setScale([50, 50, 50]);
heatmap.setPosition([0, 0, 100]);

//
// The volume rendering.
//

//var maxLength = Math.sqrt(128 * 128 * 2);
//    
//var textureBuffer = new Float32Array(2048 * 2048);
//for (var i = 0; i < 2048; i++) {
//    for (var j = 0; j < 2048; j++) {
//        var distance = Math.sqrt(Math.pow(i % 256 - 128, 2) + Math.pow(j % 256 - 128, 2)) / (Math.floor(i / 256) * 8 + j / 256) * 64;
//        textureBuffer[i * 2048 + j] = 1 - distance / maxLength;
//        // var distance = Math.sqrt(Math.pow((i - 1024), 2) + Math.pow((j - 1024), 2));
//        // textureBuffer[i * 2048 + j] = 1 - distance / maxLength;
//    }
//}

//const volume = new Modelo.ThreeDScene.Volume(viewer.getRenderScene());
//viewer.getScene().addVisualize(volume);
//
//volume.setParameter("densityImage", textureBuffer);
//volume.setParameter("platteImage", "platte.png");
//volume.setParameter("gradientImage", "density.png");
//volume.setPosition([-50, -100, 10]);
//volume.setScale([50, 50, 100]);

viewer.loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}).then(() => {
    
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
