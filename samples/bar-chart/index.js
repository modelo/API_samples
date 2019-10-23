var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.setLightingIntensity(1.0);
    
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
const keyboard = new Modelo.View.Input.Keyboard(viewer);
viewer.addInput(keyboard);
keyboard.addKeyUpListener(keyboard => {
    if (keyboard.key === 27) {
        viewer.destroy();
    }
});
    
const barchart = new Modelo.View.Visualize.BarChart(viewer.getRenderScene());
viewer.getScene().addVisualize(barchart);

barchart.setParameter("xres", 32);
barchart.setParameter("yres", 32);
barchart.setScaling([40, 40, 20]);

// Use heatmap to generate the barchart input from a bunch of points.
const heatmap = new Modelo.View.Visualize.HeatMap(viewer.getRenderScene());
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

// Create bar chart.
barchart.setParameter("dataTexture", heatmap.getTexture());
barchart.setParameter("platteImage", "platte.png");
barchart.setParameter("thickness", 0.9);

// Create ground geometry
var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);
viewer.invalidate();

barchart.setEnabled(true);


