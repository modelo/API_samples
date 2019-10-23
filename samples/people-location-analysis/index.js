const modelId = "2YDqqX85";
const appToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({
    endpoint: "https://build-portal.modeloapp.com",
    appToken
});

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
viewer.setRenderingLinesEnabled(true);
viewer.loadModel(modelId, progress => {
  // /assets/js/utils.js
  updateProgress(progress);
}).then( async () => {
    
    const bbox = [-101.78817749023438, -83.82557678222656, -180.5775146484375, 101.7881851196289, -54.82966232299805, -96.28856658935547];
    setDarkTheme(viewer);
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
        width: 840,
        height: 336,
        contour: true,
        contourColor:  [1, 0, 0, 1.0],
        backgroundColor: [1, 1, 1, 0],
        color: [1.0, 0.45, 0.45, 1.0]
    };
    await modeloMetaball(rawData, metaballConfig);
});


async function modeloMetaball(data, config) {
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
    metaball.setParameter("radius", 24);

    const personModel = new Modelo.View.PawnBillboard("PersonModel", viewer.getResourceManager(), viewer.getMaterialManager());
    // load person model
    await personModel.load('z8ApoqYX').then( () => {
        viewer.getScene().addPawn(personModel);
    })

    for (let i = 0; i < points.length; i++) {
        const person = personModel.clone('person-' + i);
        person.setTranslation(points[i].x, points[i].y, 0);
        person.setScaling(20, 20, 20);
        viewer.getScene().addPawn(person);
    }

    const groundPlane = new Modelo.View.Pawn("groundPlane", viewer.getResourceManager(), viewer.getMaterialManager());
    groundPlane.createTexturedQuad([metaball.getTexture()]);
    groundPlane.setScaling((max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5, 1.0);
    groundPlane.setTranslation((max[0] + min[0]) * 0.5, (max[1] + min[1]) * 0.5, 0);
    viewer.getScene().addPawn(groundPlane);
}