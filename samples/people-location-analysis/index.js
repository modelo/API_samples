const modelId = "2YDqqX85";
const appToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({
    endpoint: "https://build-portal.modeloapp.com",
    appToken
});

const viewer = new Modelo.View.Viewer3D("model");
viewer.setRenderingLinesEnabled(true);
viewer.loadModel(modelId, progress => {
  // /assets/js/utils.js
  updateProgress(progress);
}).then(() => {
    
    const bbox =  [-89.5673828125, -83.00537109375, -161.33059692382812, 89.56739807128906, -49.967777252197266, -92.43257904052734];
    setCommonDark(viewer);
    viewer.addTool(new Modelo.View.Tool.Section(viewer));
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    const keyboard = new Modelo.View.Input.Keyboard(viewer);

    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
        if (keyboard.key === 27) {
            viewer.destroy();
        }
    });

    const sectionTool = viewer.getTool('Section');
    sectionTool.setEnabled(true);
    sectionTool.setSectionBox(bbox);
    sectionTool.setInteractive(true);
    const metaballConfig = {
        width: 512,
        height: 128,
        contour: true,
        contourColor:  [1, 0, 0, 1.0],
        backgroundColor: [1, 1, 1, 1],
        color: [1.0, 0.45, 0.45, 1.0]
    };
    modeloMetaball(rawData, metaballConfig);
});


function modeloMetaball(data, config) {
    // viewer.getTool('Section').setEnabled(false);
    var points = data.points;
    var min = data.min, max = data.max;
    var relativePoints = [];
    // mm to foot
    min[0] /= 304;
    min[1] /= 304;
    max[0] /= 304;
    max[1] /= 304;
    points.forEach((point, index) => {
        // mm to foot
        point.x = point.x / 304;
        point.y = point.y / 304;
        relativePoints[index] = {
            x: (point.x - min[0]) / (max[0] - min[0]),
            y: (point.y - min[1]) / (max[1] - min[1])
        }
    });

    const metaball = new Modelo.View.Visualize.MetaBall(viewer.getRenderScene());
    metaball.setParameter("points", relativePoints);
    metaball.setParameter("width", config.width);
    metaball.setParameter("height", config.height);
    metaball.setParameter("contour", config.contour);
    metaball.setParameter("contourColor", config.contourColor);
    metaball.setParameter("backgroundColor", config.backgroundColor);
    metaball.setParameter("color", config.color);
    metaball.setParameter("radius", 16);

    for (let i = 0; i < points.length; i++) {
        const cube = new Modelo.View.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
        cube.createSolidCube();
        const x = points[i].x;
        const y = points[i].y;
        cube.setTranslation(x, y, 1.8);
        cube.setScaling(0.6, 0.6, 0.6);
        viewer.getScene().addPawn(cube);
    }
    const groundPlane = new Modelo.View.Pawn("ground2", viewer.getResourceManager(), viewer.getMaterialManager());
    groundPlane.createTexturedQuad([metaball.getTexture()]);

    groundPlane.setScaling((max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5, 1.0);
    groundPlane.setTranslation((max[0] + min[0]) * 0.5, (max[1] + min[1]) * 0.5, 1.0);
    viewer.getScene().addPawn(groundPlane);
}