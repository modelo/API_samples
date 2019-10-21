var modelId = "2YDqqX85";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");
viewer.setRenderingLinesEnabled(true);
viewer.loadModel(modelId, progress => {
  // /assets/js/utils.js
  updateProgress(progress);
  })
  .then(() => {
    const bbox = [-101.78817749023438, -83.82557678222656, -180.5775146484375, 101.7881851196289, -54.82966232299805, -96.28856658935547];
    setDarkTheme(viewer);
    viewer.addTool(new Modelo.View.Tool.Section(viewer));
    const sectionTool = viewer.getTool('Section');
    sectionTool.setEnabled(true);
    sectionTool.setSectionBox(bbox);

    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
    viewer.setSmartCullingEnabled(false);
  });

  viewer.setLazyRenderingEnabled(false);

  const ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  ribbon.setEnabled(true);
  viewer.getScene().addVisualize(ribbon);
  ribbon.setParameter("width", 2);
  ribbon.setParameter("unitLenght", 1000);
  ribbon.setParameter("speed", 1);
  ribbon.setParameter("platteTexture", "platte.png");
  let pointsArray = [];
  for (const key in escapePathData) {
    pointsArray.push(escapePathData[key]);
  }
  pointsArray.forEach((points) => {
    points.forEach(function(point) {
      point[0] = point[0] / 304;
      point[1] = point[1] / 304;
      point[2] = 1.8
    });

    const person = new Modelo.View.Pawn("person", viewer.getResourceManager(), viewer.getMaterialManager());
    // Load local gltf file with animation info. Note: Modelo3d only support gltf 2.0 version for now.
    person.loadGltfModel("./scene.gltf").then(function() {
      viewer.getScene().addPawn(person, false);
      // Get the available animations.
      const skeleton = person.getSkeletons()[0];
      const animation = skeleton.getAnimations()[0];
      // Set skeleton animation speed.
      animation.setSpeed(0.02);
      // Start animation.
      skeleton.doAnimation(animation);
  
      // Set the scaling and rotation of the person so that it can move forwad.
      person.setScaling(1, 1, 1);
      person.rotate(3.1416, [0, 0, 1], [0, 0, 0]);
  
      const pathFollowingAnimator = new Modelo.View.Tool.PathFollowingAnimator(viewer, points);
      // Attach the person to the path following animation.
      pathFollowingAnimator.addPawn(person);
      // Set the path following animation speed.
      pathFollowingAnimator.setSpeed(0.02);
      pathFollowingAnimator.start();
    });

    
    ribbon.addRibbon(points);
  });
  ribbon.setScaling(1.6, 0.6, 0.6);

