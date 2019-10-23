var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));

// Disable lazy rendering because we are animations going.
viewer.setLazyRenderingEnabled(false);

// The ground.
var ground = new Modelo.View.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);

var path = [
  [-10, -10, 1.0],
  [-10, 9, 1.0],
  [-9, 10, 1.0],
  [9, 10, 1.0],
  [10, 9, 1.0],
  [10, -10, 1.0]
];
var person = new Modelo.View.Pawn("person", viewer.getResourceManager(), viewer.getMaterialManager());

// Load local gltf file with animation info. Note: Modelo3d only support gltf 2.0 version for now.
person.loadGltfModel("./scene.gltf").then(function() {
  viewer.getScene().addPawn(person, false);
  // Get the available animations.
  var skeleton = person.getSkeletons()[0];
  var animation = skeleton.getAnimations()[0];
  // Set skeleton animation speed.
  animation.setSpeed(0.02);
  // Start animation.
  skeleton.doAnimation(animation);

  // Set the scaling and rotation of the person so that it can move forwad.
  person.setScaling(1.5, 1.5, 1.5);
  person.rotate(3.1416, [0, 0, 1], [0, 0, 0]);

  var pathFollowingAnimator = new Modelo.View.PathFollowingAnimator(viewer, path);
  // Attach the person to the path following animation.
  pathFollowingAnimator.addPawn(person);
  // Set the path following animation speed.
  pathFollowingAnimator.setSpeed(0.02);
  pathFollowingAnimator.start();
});


// Add Animating ribbon below the person to show the walking path.
var ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon.setEnabled(true);
viewer.getScene().addVisualize(ribbon);
ribbon.setParameter("width", 10);
ribbon.setParameter("unitLenght", 1);
ribbon.setParameter("speed", -1);
ribbon.setParameter("platteTexture", "./platte.png");
ribbon.addRibbon(path);