var modelId = "a8bv6085";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
var cameraNavigator = new Modelo.View.Tool.CameraNavigator(viewer);
    
var keyPoints = [];

var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);



viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    viewer.setEffectEnabled("Sketch", true);
    viewer.setEffectParameter("Sketch", "colored", true);
    viewer.setShadowEnabled(true);
    viewer.setEffectEnabled("SSAO", true);

    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));

    //添加构件选择工具以打开鼠标光标选择选项
    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);
    selectElementTool.setCloseUpEnabled(false);
    selectElementTool.setHighlightEnabled(false);

    //通过使用鼠标点击事件，来获得鼠标在三维中的位置,然后把返回的点放入关键帧点列中
    viewer.getEventEmitter().on("onPointPicked", point => {
      keyPoints.push([point[0],point[1],point[2]+6]);
      document.getElementById("points").innerHTML = 'Points selected：' + keyPoints.length;
    })

    viewer.setSmartCullingEnabled(false);
  });


  document.getElementById("start").onclick = function() {
    if(keyPoints.length == 0){
      window.alert("click on the model surface to add navigation points.");
    }
    else if(keyPoints.length < 2){
     window.alert("you don't have enough points to start the navigation.");
    }
    else{
      cameraNavigator.setSpeed(0.5);
      cameraNavigator.setRotationDuration(20);
      cameraNavigator.clearKeyPoints();

      keyPoints.forEach(function(keyPoint) {
        cameraNavigator.addKeyPoint(keyPoint);
      });
      selectElementTool.pick([], false);
      cameraNavigator.start();
      keyPoints = [];
      document.getElementById("points").innerHTML ='Points selected：'+ keyPoints.length;
    }
  }

  document.getElementById("stop").onclick = function() {
    cameraNavigator.stop();
  }

  document.getElementById("resume").onclick = function() {
    cameraNavigator.resume();
  }

