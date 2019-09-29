const modelId = "j1mXXDrb";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3D("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.loadModel(modelId, progress => {
    // /assets/js/utils.js
    updateProgress(progress);
}).then(() => {
    setCommonDark(viewer);
    // const barchart = new Modelo.View.Visualize.BarChart(viewer.getRenderScene());
    // viewer.getScene().addVisualize(barchart);
    
    // barchart.setParameter("xres", 32);
    // barchart.setParameter("yres", 32);
    // barchart.setScaling([30000, 20000, 140]);
    // barchart.setPosition([-1061.8787841796868, -2433.9294433593736,-1.9054728746414178]);
    // // Use heatmap to generate the barchart input from a bunch of points.
    // const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
    // viewer.getScene().addVisualize(heatmap);

    // const data = rawData.data;
    // for (let i = 0 ; i < data.length; i++) {
    //   data[i].x = parseFloat(data[i].X) / rawData.width;
    //   data[i].y = parseFloat(data[i].Y) / rawData.height;
    // }
  
    // heatmap.setParameter("points", data);
    // heatmap.setParameter("width", 256);
    // heatmap.setParameter("height", 256);
    // heatmap.setParameter("gridSize", 64);
    
    // const heightMap = new Modelo.View.Visualize.HeightMap(viewer.getRenderScene());
    // viewer.getScene().addVisualize(heightMap);

    // heightMap.setParameter("xres", 1024);
    // heightMap.setParameter("yres", 1024);
    // heightMap.setParameter("dataTexture", heatmap.getTexture());
    // heightMap.setParameter("platteImage", "platte.png");
    // heightMap.setScaling([3000, 2000, 5.0]);
    // heightMap.setEnabled(true);
    const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
    viewer.getScene().addVisualize(heatmap);
    const points = [];
    const xres = 28;
    const yres = 22;
    for (let i = 0 ; i < data.length; i += 2) {
        const gridIndex = data[i];
        const numPoints = data[i + 1];
  
        const x = gridIndex % xres;
        const y = (gridIndex - x) / xres;
        if (y >= 22) {
            console.error("wrong grid index!");
        }
  
        const xx = (x + 0.5) / 28;
        const yy = (y + 0.5) / 22;
        points.push({x: xx, y: yy, number:numPoints});
    }
    heatmap.setParameter("points", points);
    heatmap.setParameter("width", 256);
    heatmap.setParameter("height", 256);
    heatmap.setParameter("gridSize", 8);
    heatmap.setParameter("blend", true);
    heatmap.setParameter("platteImage", "platte.png");
    heatmap.setScaling([9000, 7000, 1]);
    heatmap.setPosition([3550.8787841796868, -8833.9294433593736, -1.9054728746414178]);
    heatmap.setParameter("maxValue", 6000);
    heatmap.setEnabled(true);

    // const heightMap = new Modelo.View.Visualize.HeightMap(viewer.getRenderScene());
    // viewer.getScene().addVisualize(heightMap);

    // heightMap.setParameter("xres", 1024);
    // heightMap.setParameter("yres", 1024);
    // heightMap.setParameter("dataTexture", heatmap.getTexture());
    // heightMap.setParameter("blend", true);
    // heightMap.setParameter("platteImage", "platte.png");
    // heightMap.setScaling([9000, 7000, 1]);
    // heightMap.setPosition([3550.8787841796868, -8833.9294433593736, -1.9054728746414178]);
    // heightMap.setEnabled(true);

    Modelo.Comment.get(modelId).then(res => {
      Modelo.Comment.activate(res[res.length - 1].id);
    })
});