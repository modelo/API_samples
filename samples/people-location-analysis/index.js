const modelId = "p1wbbNrj";
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
    const bbox = [-102.11074829101562, -86.12214660644531, -192.383056640625, 102.11075592041016, -25.466358184814453, -92.75041961669922];
    setCommonDark(viewer);
    viewer.addTool(new Modelo.View.Tool.Section(viewer));
    viewer.getTool('Section').setSectionBox(bbox)
    
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    const keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
        if (keyboard.key === 27) {
            viewer.destroy();
        }
    });
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
    const metaball = new Modelo.View.Visualize.MetaBall(viewer.getRenderScene());
    metaball.setParameter("points", points);
    metaball.setParameter("width", config.width);
    metaball.setParameter("height", config.height);
    metaball.setParameter("contour", config.contour);
    metaball.setParameter("contourColor", config.contourColor);
    metaball.setParameter("backgroundColor", config.backgroundColor);
    metaball.setParameter("color", config.color);

    const groundPlane = new Modelo.View.Pawn("ground1", viewer.getResourceManager(), viewer.getMaterialManager());
    groundPlane.createTexturedQuad([metaball.getTexture()]);
    groundPlane.setScaling(75, 30, 1.0);
    groundPlane.setTranslation(240, -400, 131);
    viewer.getScene().addPawn(groundPlane);
}