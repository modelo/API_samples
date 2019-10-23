var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

var animate = true;
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
var keyboard = new Modelo.View.Input.Keyboard(viewer);
viewer.addInput(keyboard);
keyboard.addKeyUpListener(keyboard => {
    if (keyboard.key === 27) {
        animate = !animate;
        trails.setAnimationEnabled(animate);
    }
});

viewer.setLazyRenderingEnabled(false);
    
var trails = new Modelo.View.Visualize.Trail(viewer.getRenderScene());
viewer.getScene().addVisualize(trails);


var TRAIL_NUMBER = 10;
var TRAIL_POINTS = 10; // half of the number of line segments 
var gridSize = 80 / (TRAIL_POINTS - 1);

for (var k = 0; k < TRAIL_NUMBER; k++) {
    var xs = [];
    var ys = [];

    xs.push(-40.0);
    ys.push(Math.round(Math.random() * 80 - 40));

    for (var i = 1; i < TRAIL_POINTS - 1; i++) {
        var x = gridSize * i - (Math.random() * 0.5 - 0.25) * gridSize - 40.0;
        var y = Math.round(Math.random() * 80 - 40);

        xs.push(x);
        ys.push(y);
    }

    xs.push(40.0);
    ys.push(Math.round(Math.random() * 80 - 40));
        
    var points = [];
    for (var j = 0; j < TRAIL_POINTS; j++) {
        points.push(xs[j]);
        points.push(ys[j]);
        points.push(1.01);

        if (j < TRAIL_POINTS - 1) {
            points.push(xs[j]);
            points.push(ys[j + 1]);
            points.push(1.01);
        }
    }
        
    trails.addTrail(points);
}
    
trails.setEnabled(true);

trails.setParameter("color", [81.0 / 255.0, 185.0 / 255.0, 1.0]);
trails.setParameter("speed", 0.02);

// Create ground geometry
var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);

