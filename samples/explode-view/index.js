var modelId = "wrJNv6rj";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

var exploeded = false;
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);


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
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
  });


 document.getElementById("building_01").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView(building,building_01exp); 
    exploeded =!exploeded;
  }
 }

 document.getElementById("building_02").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView(building,building_02exp); 
    exploeded =!exploeded;
  }
 }

 document.getElementById("building_03").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView(building,building_03exp); 
    exploeded =!exploeded;
  }
 }