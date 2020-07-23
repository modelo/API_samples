var modelId1 = "q8ZZ428a";
var modelId2 = "98yNGlrK";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
var HiddenElements = [];

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

var minz = 0;
var maxz = 0;
let scene = viewer.getScene();
let model1height =0;
viewer.loadModel(modelId1,updateProgress)
.then(() => {
  
  let model1 = scene.core.models[modelId1];
  model1height = model1.bbox[5] - model1.bbox[2] ;

  let initTranslation = [0,0,0];
    let dir = 1;
    function animate( now ) {
        requestAnimationFrame( animate );
        if(!(minz&&maxz)){
          return;
        }
        if(initTranslation[2]>maxz-model1height){
          dir = -1;
        }
        if(initTranslation[2]<minz){
          dir = 1;
        }
          model1.setTranslation(0,0,initTranslation[2]+dir); 
          viewer.invalidate();
          initTranslation[2] +=dir;
      
    }
    animate();

    console.log("model1 loading done");

});

viewer.loadModel(modelId2,updateProgress)
.then(() => {
  let model2 = scene.core.models[modelId2];
    minz = model2.bbox[2];
    maxz = model2.bbox[5];
    console.log("model1 loading done");

});