const modelId = "p1wbbNrj";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

document.body.appendChild(document.getElementById("model"));

function updateProgress(progress) {
    let c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3DDark("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.


const volumeData = {
    "2-13": {
      "outerLoop": [
        [
          42603.193350421549,
          -129397.75751955743
        ],
        [
          95079.242763671573,
          -129397.75751955743
        ],
        [
          95079.242763671573,
          -114544.75351938422
        ],
        [
          42603.193350421549,
          -114544.75351938422
        ],
        [
          42603.193350421549,
          -129397.75751955743
        ]
      ],
      "innerLoop": []
    },
    "1": {
      "outerLoop": [
        [
          76771.533524249346,
          -133618.49885709694
        ],
        [
          95079.242763671573,
          -133618.49885709694
        ],
        [
          95079.242763671573,
          -114544.75351938422
        ],
        [
          42603.193350421549,
          -114544.75351938422
        ],
        [
          42603.193350421549,
          -133618.49885709694
        ],
        [
          62163.374831401488,
          -133618.49885709694
        ],
        [
          62163.37483140151,
          -129397.75751953124
        ],
        [
          76771.533524249375,
          -129397.75751953124
        ],
        [
          76771.533524249346,
          -133618.49885709694
        ]
      ],
      "innerLoop": []
    },
    "max": [
      95079.243,
      -114544.754
    ],
    "min": [
      42603.193,
      -133618.499
    ]
}


let myMax = [-Infinity, -Infinity];
let myMin = [Infinity, Infinity];
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
    const width = 2048;
    const height = 2048;
    var res = [];
    var tmp = subtract(point, min);
    res[0] = tmp[0] / dia[0];
    res[1] = 1.0 - tmp[1] / dia[1];

    res[0] = res[0] * width / 8;
    res[1] = res[1] * height / 8;
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

        if (point[0] > myMax[0]) {
            myMax[0] = point[0];
        }
        if (point[1] > myMax[1]) {
            myMax[1] = point[1];
        }
        if (point[0] < myMin[0]) {
            myMin[0] = point[0];
        }
        if (point[1] < myMin[1]) {
            myMin[1] = point[1];
        }
    }
    region.closePath();

    ctx.fillStyle = color;
    ctx.fill(region);
}

function getVolumImage() {
    const canvas = document.getElementById('volume');
    const ctx = canvas.getContext('2d');

    const width = 2048;
    const height = 2048;
    const min = volumeData.min;
    const max = volumeData.max;
    const dia = subtract(max, min);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    for (const key in volumeData) {
        const arr = key.split('-');
        const bottom = parseInt(arr[0]);
        let topCoord = parseInt(arr[0]);
        if (arr.length == 2) {
            topCoord = parseInt(arr[1]);
        }

        var pathes = volumeData[key];

        for (let i = bottom - 1; i < topCoord; i++) {
            const row = Math.floor(i / 8);
            const col = i % 8;

            const left = col * width / 8;
            const topPixel  = row * height / 8;

            drawPolyline(pathes.outerLoop, 'white', left, topPixel, min, max, dia, ctx);

            pathes.innerLoop.forEach(function(points) {
                drawPolyline(points, 'black', left, topPixel, min, max, dia, ctx);
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
    return bytes.buffer;
}

viewer.loadModel(modelId, updateProgress).then(() => {
    const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
    viewer.getScene().addVisualize(heatmap);
    heatmap.setParameter("width", 256);
    heatmap.setParameter("height", 256);
    heatmap.setParameter("gridSize", 32);
    const data = [];
    const imageDatas = [];
    for (let i = 0; i < 64; i++) {
        for (let j = 0; j < 20; j++) {
            data[j] = {
                x: Math.random(),
                y: Math.random(),
                number: Math.random() * 10
            }
        }
        heatmap.setParameter("points", data);
        let imageData = heatmap.getImageData();
        imageDatas.push(new Float32Array(imageData));
    }
    let volumeRenderingData = base64ToArrayBuffer(getVolumImage());
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // var offset = i * 256 * 256 * 8 + j * 256 * 256;
            for (let ii = 0; ii < 256; ii++) {
                for (let jj = 0; jj < 256; jj++) {
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
    
    volume.setParameter("platteImage", "platte.png");
    volume.setParameter("data", { "data": volumeRenderingData, "width": 2048, "height": 2048 });
    volume.setParameter("layer3", 64);
    volume.setScaling([300, 200, 140]);
    volume.setPosition([220, -400, 60]);
    volume.setEnabled(true);
});
