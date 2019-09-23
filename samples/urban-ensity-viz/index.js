const modelId = "j1mXXDrb";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3DDark("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.loadModel(modelId, progress => {
  updateProgress(progress);
  if (progress === 1) {
    const barchart = new Modelo.View.Visualize.BarChart(viewer.getRenderScene());
    viewer.getScene().addVisualize(barchart);
    
    barchart.setParameter("xres", 32);
    barchart.setParameter("yres", 32);
    barchart.setScaling([30000, 20000, 140]);
    barchart.setPosition([-1061.8787841796868, -2433.9294433593736,-1.9054728746414178]);
    // Use heatmap to generate the barchart input from a bunch of points.
    const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
    viewer.getScene().addVisualize(heatmap);

    const data = rawData.data;
    for (let i = 0 ; i < data.length; i++) {
      data[i].x = parseFloat(data[i].X) / rawData.width;
      data[i].y = parseFloat(data[i].Y) / rawData.height;
    }
  
    heatmap.setParameter("points", data);
    heatmap.setParameter("width", 256);
    heatmap.setParameter("height", 256);
    heatmap.setParameter("gridSize", 64);
    
    // // Create bar chart.
    // barchart.setParameter("dataTexture", heatmap.getTexture());
    // barchart.setParameter("platteImage", "platte.png");
    // barchart.setParameter("thickness", 0.9);
    
    // barchart.setEnabled(true);
    // viewer.invalidate();

    const heightMap = new Modelo.View.Visualize.HeightMap(viewer.getRenderScene());
    viewer.getScene().addVisualize(heightMap);

    heightMap.setParameter("xres", 1024);
    heightMap.setParameter("yres", 1024);
    heightMap.setParameter("dataTexture", heatmap.getTexture());
    heightMap.setParameter("platteImage", "platte.png");
    heightMap.setScaling([30000, 20000, 5.0]);
    heightMap.setPosition([-1061.8787841796868, -2433.9294433593736,-1.9054728746414178]);
    heightMap.setEnabled(true);

    Modelo.Comment.get(modelId).then(res => {
      console.log(res)
      Modelo.Comment.activate(res[res.length - 1].id);
    })
  }
}).then((e) => {
});


