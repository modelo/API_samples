const modelId = "x1qwRd8W";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");

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

barchart.setParameter("xres", 2);
barchart.setParameter("yres", 2);
barchart.setScaling([40, 40, 20]);

// Use heatmap to generate the barchart input from a bunch of points.
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

// Create bar chart.
barchart.setParameter("dataTexture", heatmap.getTexture());
barchart.setParameter("platteImage", "platte.png");
barchart.setParameter("thickness", 0.8);

// Create ground geometry
var ground = new Modelo.Scene3D.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);
viewer.invalidate();

// Defer the bar-chart rendering until the texture is loaded.
setTimeout(() => {
    barchart.setEnabled(true);
}, 2000);

