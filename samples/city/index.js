var modelId = "6YdejQ8W";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", { isMobile: isMobile() });

viewer.setRenderingLinesEnabled(true);
viewer
  .loadModel(modelId, {
    onProgress: progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  },
  usePbr: true})
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));

    viewer.getCamera().setSensitivity({ "touchPan": 0.9 });

    var images = ["./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg", "./star.jpg"];
    viewer.setReflectionImages(images);

    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat4", "reflectionIntensity", 5.0);

    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat2", "metallic", 0.1);//.setReflectionIntensity(0.1); //topomesh
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat3", "metallic", 0.2);//.setReflectionIntensity(0.2); //watersurf
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat4", "metallic", 0.7);//.setReflectionIntensity(0.7); //bdg-glow
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat5", "metallic", 0.2);//.setReflectionIntensity(0.2); //bdg>80a
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat6", "metallic", 0.2);//.setReflectionIntensity(0.2); //bdg>80b
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat7", "metallic", 0.2);//.setReflectionIntensity(0.2); //bdg<80
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat8", "metallic", 0.2);//.setReflectionIntensity(0.2); //bdg<40

    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat2", "roughness", 0.0);//.setReflectionIntensity(0.1); //topomesh
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat3", "roughness", 0.0);//.setReflectionIntensity(0.2); //watersurf
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat4", "roughness", 0.0);//.setReflectionIntensity(0.7); //bdg-glow
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat5", "roughness", 0.0);//.setReflectionIntensity(0.2); //bdg>80a
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat6", "roughness", 0.0);//.setReflectionIntensity(0.2); //bdg>80b
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat7", "roughness", 0.0);//.setReflectionIntensity(0.2); //bdg<80
    viewer.setMaterialParameter("6YdejQ8WmxPbr-mat8", "roughness", 0.0);//.setReflectionIntensity(0.2); //bdg<40


    // Add animating triangles
    var triangle1 = new Modelo.View.Pawn("triangle1", viewer.getResourceManager(), viewer.getMaterialManager());
    triangle1.load("x1qend1W").then(function () {
      var triangle2 = triangle1.clone();
      var triangle3 = triangle1.clone();
      var triangle4 = triangle1.clone();
      triangle1.setDiffuseColor([1, 1, 0]);
      triangle1.setOpacity(0.4);
      triangle2.setDiffuseColor([1, 1, 0]);
      triangle2.setOpacity(0.4);
      triangle3.setDiffuseColor([1, 1, 0]);
      triangle3.setOpacity(0.4);
      triangle4.setDiffuseColor([1, 1, 0]);
      triangle4.setOpacity(0.4);
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
      circle1.setTranslation(120668.1328125, 47596.25390625, 100);
      viewer.getScene().addPawn(circle1, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(circle1);
      setInterval(function () {
        circle1.rotate(0.01, [0, 0, 1], [120668.1328125, 47596.25390625, 100]);
      }, 10);
    }

    var circle2 = new Modelo.View.Pawn("circle1", viewer.getResourceManager(), viewer.getMaterialManager());
    var image_circle = new Image();
    image_circle.src = "./circular_03.png";
    image_circle.onload = function () {
      circle2.createTexturedQuad(image_circle);
      circle2.setScaling(1000, 1000, 1);
      circle2.setTranslation(125475.4375, 55741.0546875, 100);
      viewer.getScene().addPawn(circle2, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(circle2);
      setInterval(function () {
        circle2.rotate(0.01, [0, 0, 1], [125475.4375, 55741.0546875, 100]);
      }, 10);
    }

    var circle3 = new Modelo.View.Pawn("circle1", viewer.getResourceManager(), viewer.getMaterialManager());
    var image_circle = new Image();
    image_circle.src = "./circular_03.png";
    image_circle.onload = function () {
      circle3.createTexturedQuad(image_circle);
      circle3.setScaling(1000, 1000, 1);
      circle3.setTranslation(117580.8984375, 56858.41015625, 100);
      viewer.getScene().addPawn(circle3, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(circle3);
      setInterval(function () {
        circle3.rotate(0.01, [0, 0, 1], [117580.8984375, 56858.41015625, 100]);
      }, 10);
    }

    var circle4 = new Modelo.View.Pawn("circle1", viewer.getResourceManager(), viewer.getMaterialManager());
    var image_circle = new Image();
    image_circle.src = "./circular_03.png";
    image_circle.onload = function () {
      circle4.createTexturedQuad(image_circle);
      circle4.setScaling(1000, 1000, 1);
      circle4.setTranslation(134168.1875, 61590.73828125, 100);
      viewer.getScene().addPawn(circle4, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(circle4);
      setInterval(function () {
        circle4.rotate(0.01, [0, 0, 1], [134168.1875, 61590.73828125, 100]);
      }, 10);
    }

    // Float32Array(4) [120668.1328125, 47596.25390625, 6.8329620361328125, 1]
    // index.js:21 Float32Array(4) [125475.4375, 55741.0546875, 15.012162208557129, 1]
    // index.js:21 Float32Array(4) [117580.8984375, 56858.41015625, -15.853614807128906, 1]
    // index.js:21 Float32Array(4) [134168.1875, 61590.73828125, 18.966535568237305, 1]

    // add animating cylinder.

    var bucket1 = new Modelo.View.Pawn("bucket", viewer.getResourceManager(), viewer.getMaterialManager());
    bucket1.load("3rjPyXY4").then(function() {
      bucket1.setTranslation(120668.1328125, 47596.25390625, 150.8329620361328125);
      viewer.getScene().addPawn(bucket1, false);
      bucket1.setDiffuseColor([255/255, 227/255, 76/255]);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket1);
      var scale1 = 0;
      setInterval(function () {
        scale1 = Math.max(1, (scale1 + 40) % 10000);
        // console.log(scale);
        bucket1.setScaling(scale1 * 0.2, scale1 * 0.2, scale1 * 0.1);
        bucket1.setOpacity(1 - scale1 / 10000);
      }, 10);

      var scale2 = 0;
      var bucket2 = bucket1.clone();
      bucket2.setTranslation(125475.4375, 55741.0546875, 15.012162208557129);
      viewer.getScene().addPawn(bucket2, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket2);
      setInterval(function () {
        scale2 = Math.max(1, (scale2 + 40) % 10000);
        // console.log(scale);
        bucket2.setScaling(scale2 * 0.2, scale2 * 0.2, scale2 * 0.1);
        bucket2.setOpacity(1 - scale2 / 10000);
      }, 10);

      var scale3 = 0;
      var bucket3 = bucket1.clone();
      bucket3.setTranslation(117580.8984375, 56858.41015625, -15.853614807128906);
      viewer.getScene().addPawn(bucket3, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket3);
      setInterval(function () {
        scale3 = Math.max(1, (scale3 + 40) % 10000);
        // console.log(scale);
        bucket3.setScaling(scale3 * 0.2, scale3 * 0.2, scale3 * 0.1);
        bucket3.setOpacity(1 - scale3 / 10000);
      }, 10);

      var scale4 = 0;
      var bucket4 = bucket1.clone();
      bucket4.setTranslation(134168.1875, 61590.73828125, 18.966535568237305);
      viewer.getScene().addPawn(bucket4, false);
      viewer.getRenderScene().getEffect("Glow").addPawn(bucket4);
      setInterval(function () {
        scale4 = Math.max(1, (scale4 + 40) % 10000);
        bucket4.setScaling(scale4 * 0.2, scale4 * 0.2, scale4 * 0.1);
        bucket4.setOpacity(1 - scale4 / 10000);
      }, 10);
    });
  });
viewer.setRenderingLinesEnabled(true);
viewer.setSmartCullingEnabled(false);

// setup skybox
viewer.setBackgroundMode(Modelo.View.ViewBackground.EQUIRECTANGLE);
var img = new  Image;
img.src = "background.jpg";
img.onload = function() {
  viewer.setBackgroundImage(img);
}

// Traffic animation
viewer.setLazyRenderingEnabled(false);
var stripe1 = new Modelo.View.Visualize.AnimatingStripe(viewer.getRenderScene());
stripe1.setEnabled(true);
viewer.getScene().addVisualize(stripe1);
stripe1.setParameter("width", 100);
stripe1.setParameter("unitLenght", 50000);
stripe1.setParameter("speed", 0.4);
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
stripe2.setParameter("unitLenght", 50000);
stripe2.setParameter("speed", 0.4);
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
ribbon3.setParameter("width", 1);
ribbon3.setParameter("unitLenght", 60000);
ribbon3.setParameter("speed", 0.15);
ribbon3.setParameter("platteTexture", "./platteMetro.png");

for (var key in pathes3) {
  var path = pathes3[key];
  path.forEach(function (point) {
    //meter to feet.
    point[0] = point[0] * 3.2808;
    point[1] = point[1] * 3.2808;
    point[2] = point[2] * 3.2808;
  });
  ribbon3.addRibbon(path);
  // break;
}

viewer.setEffectParameter("Glow", "intensity", 0.05);

