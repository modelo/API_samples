var modelId1 = "xramebrm";
var modelId2 = 'j1OoJ91b';
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMxLCJ1c2VybmFtZSI6ImxtIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTYzNDYxMjQ2NSwiZXhwIjozMzE3MDYxMjQ2NX0.Q8IHwhg90aatmTeZChUthyhyt4KVAgKgf7LFMTgL0Ao"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
var gizmo = new Modelo.View.Tool.TransformGizmo(viewer);

var initModel1Transfrom = [];
var initModel2Transfrom = [];
viewer.loadModel(modelId1, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    viewer.loadModel(modelId2).then(()=>{
      initModel1Transfrom = viewer.getModelTransform(modelId1);
      initModel2Transfrom = viewer.getModelTransform(modelId2);

      document.getElementById('model1').onclick= function(){
        gizmo.setEnabled(true);
        gizmo.setModel(modelId1);
      }
      document.getElementById('model2').onclick= function(){
        gizmo.setEnabled(true);
        gizmo.setModel(modelId2);
      }
      document.getElementById('revoke').onclick= function(){
        gizmo.revokeOperation();
      }

      document.getElementById('reset').onclick = function(){
        viewer.setModelTransform(modelId1,initModel1Transfrom);
        viewer.setModelTransform(modelId2,initModel2Transfrom);
      }
    })

    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    viewer.addTool(gizmo);

    window.onresize = function(){
      const w = window.innerWidth;
      const h = window.innerHeight;
      viewer.resize(w,h);
    }
  });
