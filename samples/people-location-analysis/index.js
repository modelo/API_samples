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
    
    const bbox = [-89.5673828125, -83.00537109375, -161.33059692382812, 89.56739807128906, -9.317974090576172, -92.43255615234375];
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
    
    const metaballConfig = {
        width: 512,
        height: 512,
        contour: true,
        contourColor:  [1, 0, 0, 1.0],
        backgroundColor: [1, 1, 1, 0.0],
        color: [1.0, 0.45, 0.45, 1.0]
    };
    modeloMetaball(rawData, metaballConfig);
});


function modeloMetaball(points, config) {
    // viewer.getTool('Section').setEnabled(false);
    points.forEach(point => {
        point.x = point.x / 100;
        point.y = point.y / 100;
    })
    const metaball = new Modelo.View.Visualize.MetaBall(viewer.getRenderScene());
    metaball.setParameter("points", points);
    metaball.setParameter("width", config.width);
    metaball.setParameter("height", config.height);
    metaball.setParameter("contour", config.contour);
    metaball.setParameter("contourColor", config.contourColor);
    metaball.setParameter("backgroundColor", config.backgroundColor);
    metaball.setParameter("color", config.color);

    const groundPlane = new Modelo.View.Pawn("ground2", viewer.getResourceManager(), viewer.getMaterialManager());
    groundPlane.createTexturedQuad([metaball.getTexture()]);
    groundPlane.setScaling(40, 40, 1.0);
    groundPlane.setTranslation(0, 0, 1.01);
    viewer.getScene().addPawn(groundPlane);

    for (let i = 0; i < points.length; i++) {
        const cube = new Modelo.View.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
        cube.createSolidCube([0.8, 0.8, 0.8]);
        const x = points[i].x - 40.0;
        const y = points[i].y - 40.0;
        cube.setTranslation(x, y, 2.013);
        cube.setScaling(0.6, 0.6, 0.6);
        viewer.getScene().addPawn(cube);
    }
}