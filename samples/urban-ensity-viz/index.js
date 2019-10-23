let heatmap, heatmapPoints = [];
document.getElementById('configButton').onclick = () => {
    const configValues = $('#configForm').serializeArray();
    if (configValues) {
        configValues.map(item => {
            if (item.value) {
                if (item.name === 'blend') item.value = Number(item.value);
                heatmap.setParameter(item.name, item.value);
            }
        })
    }
    heatmap.setParameter("points", heatmapPoints);
  }

  document.getElementById('randomData').onclick = () => {
    heatmapPoints = heatmapPoints.map(item => {
        item.number = Math.floor(Math.random() * 120);
        return item;
    })

    heatmap.setParameter("points", heatmapPoints);
  }

function setHeatmap(viewer, points, heatmapConfig) {
    heatmapPoints = points;
    heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
    viewer.getScene().addVisualize(heatmap);
    heatmap.setParameter("points", points);
    heatmap.setParameter("width", heatmapConfig.width);
    heatmap.setParameter("height", heatmapConfig.height);
    heatmap.setParameter("gridSize", heatmapConfig.gridSize);
    heatmap.setParameter("blend", heatmapConfig.blend);
    heatmap.setParameter("maxValue", heatmapConfig.maxValue);
    heatmap.setParameter("platteImage", "platte.png");
    heatmap.setScaling(heatmapConfig.scale);
    heatmap.setPosition(heatmapConfig.position);
    heatmap.setEnabled(true);
}
const modelId = "j1mXXDrb";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });
const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
viewer.loadModel(modelId, progress => {
    // /assets/js/utils.js
    updateProgress(progress);
}).then(() => {
    setDarkTheme(viewer);

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
        points.push({x: xx, y: yy, number: numPoints});
    }

    setHeatmap(viewer, points, {
        width: 256,
        height: 256,
        gridSize: 8,
        blend: true,
        maxValue: 6000,
        scale: [9000, 7200, 1],
        position: [3550.8787841796868, -8633.9294433593736, -1.9054728746414178]
    })
    Modelo.Comment.get(modelId).then(res => {
      Modelo.Comment.activate(res[res.length - 1].id);
    })
});