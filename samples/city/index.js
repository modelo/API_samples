var modelId = "zY7P6G87";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", { isMobile: isMobile() });

viewer.setRenderingLinesEnabled(true);
viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));

    viewer.getCamera().setSensitivity({ "touchPan": 0.9 });

    var images = ["./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg"];
    viewer.setReflectionMap(images, () => {
      viewer._materialManager._materials["zY7P6G87mat2"].setReflectionIntensity(0.1); //topomesh
      viewer._materialManager._materials["zY7P6G87mat3"].setReflectionIntensity(0.2); //watersurf
      viewer._materialManager._materials["zY7P6G87mat4"].setReflectionIntensity(0.7); //bdg-glow
      viewer._materialManager._materials["zY7P6G87mat5"].setReflectionIntensity(0.2); //bdg>80a
      viewer._materialManager._materials["zY7P6G87mat6"].setReflectionIntensity(0.2); //bdg>80b
      viewer._materialManager._materials["zY7P6G87mat7"].setReflectionIntensity(0.2); //bdg<80
      viewer._materialManager._materials["zY7P6G87mat8"].setReflectionIntensity(0.2); //bdg<40
    });


    // Add animating triangles
    var triangle1 = new Modelo.View.Pawn("triangle1", viewer.getResourceManager(), viewer.getMaterialManager());
    triangle1.load("x1qend1W").then(function () {
      var triangle2 = triangle1.clone();
      var triangle3 = triangle1.clone();
      var triangle4 = triangle1.clone();
      triangle1.setDiffuseColor([1, 1, 0]);
      triangle2.setDiffuseColor([1, 1, 0]);
      triangle3.setDiffuseColor([1, 1, 0]);
      triangle4.setDiffuseColor([1, 1, 0]);
      triangle1.setScaling(400, 400, 400);
      triangle2.setScaling(400, 400, 400);
      triangle3.setScaling(400, 400, 400);
      triangle4.setScaling(400, 400, 400);
      viewer.getRenderScene().getEffect("Glow").addPawn(triangle1);
      viewer.getRenderScene().getEffect("Glow").addPawn(triangle2);
      viewer.getRenderScene().getEffect("Glow").addPawn(triangle3);
      viewer.getRenderScene().getEffect("Glow").addPawn(triangle4);
      viewer.getScene().addPawn(triangle1, false);
      viewer.getScene().addPawn(triangle2, false);
      viewer.getScene().addPawn(triangle3, false);
      viewer.getScene().addPawn(triangle4, false);

      var step1 = 1, step2 = 1, step3 = 1, step4 = 1;
      var trans1 = [120668.1328125, 47596.25390625, 900];
      triangle1.setTranslation(trans1[0], trans1[1], trans1[2]);
      setInterval(function () {
        trans1[2] += step1;
        if (trans1[2] > 1000 || trans1[2] < 900) {
          step1 *= -1;
        }
        triangle1.setTranslation(trans1[0], trans1[1], trans1[2]);
      }, 10);

      var trans2 = [125475.4375, 55741.0546875, 900];
      setInterval(function () {
        trans2[2] += step2;
        if (trans2[2] > 1000 || trans2[2] < 900) {
          step2 *= -1;
        }
        triangle2.setTranslation(trans2[0], trans2[1], trans2[2]);
      }, 10);

      var trans3 = [117580.8984375, 56858.41015625, 900];
      triangle3.setTranslation(trans3[0], trans3[1], trans3[2]);
      setInterval(function () {
        trans3[2] += step3;
        if (trans3[2] > 1000 || trans3[2] < 900) {
          step3 *= -1;
        }
        triangle3.setTranslation(trans3[0], trans3[1], trans3[2]);
      }, 10);

      var trans4 = [134168.1875, 61590.73828125, 900];
      triangle4.setTranslation(trans4[0], trans4[1], trans4[2]);
      setInterval(function () {
        trans4[2] += step4;
        if (trans4[2] > 1000 || trans4[2] < 900) {
          step4 *= -1;
        }
        triangle4.setTranslation(trans4[0], trans4[1], trans4[2]);
      }, 10);
    });

    // add animating circle
    var circle1 = new Modelo.View.Pawn("circle1", viewer.getResourceManager(), viewer.getMaterialManager());
    var image_circle = new Image();
    image_circle.src = "./circular_03.png";
    image_circle.onload = function () {
      circle1.createTexturedQuad(image_circle);
      circle1.setScaling(1000, 1000, 1);
      circle1.setTranslation(120668.1328125, 47596.25390625, 600);
      viewer.getScene().addPawn(circle1, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(circle1);
      setInterval(function () {
        circle1.rotate(0.01, [0, 0, 1], [120668.1328125, 47596.25390625, 600]);
      }, 10);
    }

    // Float32Array(4) [120668.1328125, 47596.25390625, 6.8329620361328125, 1]
    // index.js:21 Float32Array(4) [125475.4375, 55741.0546875, 15.012162208557129, 1]
    // index.js:21 Float32Array(4) [117580.8984375, 56858.41015625, -15.853614807128906, 1]
    // index.js:21 Float32Array(4) [134168.1875, 61590.73828125, 18.966535568237305, 1]

    // add animating cylinder.
    var image1 = new Image();
    image1.src = "./gradual_change_red_02.png";
    image1.onload = function () {
      var bucket1 = new Modelo.View.Pawn("bucket", viewer.getResourceManager(), viewer.getMaterialManager());
      bucket1.createTextureBucket(image1);
      bucket1.setTranslation(120668.1328125, 47596.25390625, 6.8329620361328125);
      viewer.getScene().addPawn(bucket1, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket1);
      var scale1 = 0;
      setInterval(function () {
        scale1 = Math.max(1, (scale1 + 100) % 20000);
        // console.log(scale);
        bucket1.setScaling(scale1 * 0.2, scale1 * 0.2, scale1 * 0.07);
        bucket1.setTransparent(1 - scale1 / 20000);
      }, 10);

      var scale2 = 0;
      var bucket2 = bucket1.clone();
      bucket2.setTranslation(125475.4375, 55741.0546875, 15.012162208557129);
      viewer.getScene().addPawn(bucket2, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket2);
      setInterval(function () {
        scale2 = Math.max(1, (scale2 + 100) % 20000);
        // console.log(scale);
        bucket2.setScaling(scale2 * 0.2, scale2 * 0.2, scale2 * 0.07);
        bucket2.setTransparent(1 - scale2 / 20000);
      }, 10);

      var scale3 = 0;
      var bucket3 = bucket1.clone();
      bucket3.setTranslation(117580.8984375, 56858.41015625, -15.853614807128906);
      viewer.getScene().addPawn(bucket3, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket3);
      setInterval(function () {
        scale3 = Math.max(1, (scale3 + 100) % 20000);
        // console.log(scale);
        bucket3.setScaling(scale3 * 0.2, scale3 * 0.2, scale3 * 0.07);
        bucket3.setTransparent(1 - scale3 / 20000);
      }, 10);

      var scale4 = 0;
      var bucket4 = bucket1.clone();
      bucket4.setTranslation(134168.1875, 61590.73828125, 18.966535568237305);
      viewer.getScene().addPawn(bucket4, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket4);
      setInterval(function () {
        scale4 = Math.max(1, (scale4 + 100) % 20000);
        bucket4.setScaling(scale4 * 0.2, scale4 * 0.2, scale4 * 0.07);
        bucket4.setTransparent(1 - scale4 / 20000);
      }, 10);
    }
  });

viewer.setRenderingLinesEnabled(true);
viewer.setSmartCullingEnabled(false);

// setup skybox
viewer.setBackgroundMode(Modelo.View.ViewBackground.EQUIRECTANGLE);
viewer.setBackgroundImage("background.jpg");

// Traffic animation
viewer.setLazyRenderingEnabled(false);
var stripe1 = new Modelo.View.Visualize.AnimatingStripe(viewer.getRenderScene());
stripe1.setEnabled(true);
viewer.getScene().addVisualize(stripe1);
stripe1.setParameter("width", 100);
stripe1.setParameter("unitLenght", 100000);
stripe1.setParameter("speed", 0.2);
stripe1.setParameter("platteTexture", "./traffic_02.png");

for (var key in pathes1) {
  var path = pathes1[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808 + 30
  });
  stripe1.addStripe(path);
}

var stripe2 = new Modelo.View.Visualize.AnimatingStripe(viewer.getRenderScene());
stripe2.setEnabled(true);
viewer.getScene().addVisualize(stripe2);
stripe2.setParameter("width", 100);
stripe2.setParameter("unitLenght", 100000);
stripe2.setParameter("speed", 0.2);
stripe2.setParameter("platteTexture", "./traffic_04.png");

for (var key in pathes2) {
  var path = pathes2[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808 + 15;
  });
  stripe2.addStripe(path);
}

var ribbon3 = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
ribbon3.setEnabled(true);
viewer.getScene().addVisualize(ribbon3);
ribbon3.setParameter("width", 2);
ribbon3.setParameter("unitLenght", 60000);
ribbon3.setParameter("speed", 0.2);
ribbon3.setParameter("platteTexture", "./platteMetro.png");

for (var key in pathes3) {
  var path = pathes3[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808
  });
  ribbon3.addRibbon(path);
  // break;
}

viewer.setEffectParameter("Glow", "intensity", 0.4);

