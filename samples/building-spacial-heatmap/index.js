const modelId = "RYQvvJ8x";
const appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({
  endpoint: "https://build-portal.modeloapp.com",
  appToken
});

document.body.appendChild(document.getElementById("model"));

function updateProgress(progress) {
  let c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3DDark("model", { isMobile: isMobile() });
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

const outlineInfo = {
  "2-13": {
    "outerLoop": [[140.14208338954458, -425.6505181564389], [312.76066698576176, -425.6505181564389], [312.76066698576176, -376.79195236639544], [140.14208338954458, -376.79195236639544], [140.14208338954458, -425.6505181564389]],
    "innerLoop": []
  },
  "1": {
    "outerLoop": [[252.5379392245044,-439.5345357141347],[312.76066698576176,-439.5345357141347],[312.76066698576176,-376.79195236639544],[140.14208338954458,-376.79195236639544],[140.14208338954458,-439.5345357141347],[204.48478562961017,-439.5345357141347],[252.5379392245044,-439.5345357141347]],
    "innerLoop": []
  },
  "max": [
    322.7606677631579, -350.7919539473684, 127.94604934210527
  ],
  "min": [
    130.1420822368421, -465.53453618421054, 0
  ]
}
const width = 1024;
const height = 256;
const gridSizeX = 8;
const gridSizeY = 2;
const min = outlineInfo.min;
const max = outlineInfo.max;
const dia = subtract(max, min);
const layers = 13;

function subtract(pt1, pt2) {
  var res = [];
  res[0] = pt1[0] - pt2[0];
  res[1] = pt1[1] - pt2[1];
  res[2] = pt1[2] - pt2[2];
  return res;
}

function length(pt) {
  return Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
}

function getCoord(point, min, dia) {

  var res = [];
  var tmp = subtract(point, min);
  res[0] = tmp[0] / dia[0];
  res[1] = 1.0 - tmp[1] / dia[1];

  res[0] = res[0] * width / gridSizeX;
  res[1] = res[1] * height / gridSizeY;
  return res;
}

function drawPolyline(points, color, left, topPixel, min, max, dia, ctx) {
  let region = new Path2D();
  var point = points[0];
  var coord = getCoord(point, min, dia);
  coord[0] += left;
  coord[1] += topPixel;
  region.moveTo(coord[0], coord[1]);
  for (var j = 1; j < points.length; j++) {
    point = points[j];
    coord = getCoord(point, min, dia);
    coord[0] += left;
    coord[1] += topPixel;
    region.lineTo(coord[0], coord[1]);
  }
  region.closePath();
  ctx.fillStyle = color;
  ctx.fill(region);
}

// generate mask image according to the outline of each floor with canvas2D.
function getMaskImage() {
  const canvas = document.getElementById('volume');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  for (const key in outlineInfo) {
    const arr = key.split('-');
    const bottom = parseInt(arr[0]);
    let top = parseInt(arr[0]);
    if (arr.length == 2) {
      top = parseInt(arr[1]);
    }
    var outline = outlineInfo[key];
    for (let i = bottom - 1; i < top; i++) {
      const row = Math.floor(i / gridSizeX);
      const col = i % gridSizeX;

      const leftPixel = col * width / gridSizeX;
      const topPixel = row * height / gridSizeY;

      drawPolyline(outline.outerLoop, 'white', leftPixel, topPixel, min, max, dia, ctx);

      outline.innerLoop.forEach(function (points) {
        drawPolyline(points, 'black', leftPixel, topPixel, min, max, dia, ctx);
      });
    }
  }
  return canvas.toDataURL('image/png');
}

function base64ToArrayBuffer(base64) {
  const binary_string = window.atob(base64.split(',')[1]);
  const len = binary_string.length;
  const bytes = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

viewer.loadModel(modelId, progress => {
    // /assets/js/utils.js
    updateProgress(progress);
}).then(() => {
  const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
  viewer.getScene().addVisualize(heatmap);
  heatmap.setParameter("width", 128);
  heatmap.setParameter("height", 128);
  heatmap.setParameter("gridSize", 16);

  /****** Generate heatmap data for each floor *****/
  let imageDatas = [];
  for (let i = 0; i < layers; i++) {
    var data = [];
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

  let randomVolumeData = new Float32Array(width * height);
  for (let i = 0; i < gridSizeY; i++) {
    for (let j = 0; j < gridSizeX; j++) {
      if (i * 8 + j >= layers) {
        continue;
      }
      for (let ii = 0; ii < 128; ii++) {
        for (let jj = 0; jj < 128; jj++) {
          randomVolumeData[i * 128 * 128 * 8 + ii * 128 * 8 + j * 128 + jj] = imageDatas[i * 8 + j][ii * 128 + jj];
          if (i == 0 && j == 0) {
            randomVolumeData[i * 128 * 128 * 8 + ii * 128 * 8 + j * 128 + jj] = 1.0;
          }
        }
      }
    }
  }
  /****** Generate heatmap data for each floor *****/

  const volume = new Modelo.View.Visualize.MultiLayerVolume(viewer.getRenderScene());
  viewer.getScene().addVisualize(volume);

  volume.setParameter("platteImage", "platte.png");
  volume.setParameter("gridSize", [gridSizeX, gridSizeY]); // indicates the heatmap layout of each floor.
  volume.setParameter("data", {
    "data": randomVolumeData,
    "width": width,
    "height": height
  });
  volume.setParameter("maskImage", getMaskImage()); // The mask image, make tiny difference to this building because it's an almost cuboid.
  volume.setParameter("layers", layers); // total floor numbers of the building.
  volume.setScaling([dia[0], dia[1], dia[2]]);
  var center = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
  volume.setPosition(center);
  volume.setEnabled(true);

  // Turn on the code below to see the image of the final volume rendering effect.
  // var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
  // ground.createTexturedQuad(volume.getVolumeTexture());
  // ground.setScaling(dia[0], dia[0], 10);
  // ground.setTranslation(center[0], center[1], 0);
  // viewer.getScene().addPawn(ground, false);
});