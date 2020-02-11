var modelId = "q8ZjpB8a";
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

viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("loading done");

  // 新建Transform工具，参数分别是viewer，modelId和transform工具的显示比例，默认值为1.
  var transform = new Modelo.View.Tool.TransformGizmo(viewer, modelId, 1.0);
  // 将工具加入到viewer中
  viewer.addTool(transform);
  document.getElementById("transform-model").onclick = function() {
    transform.setEnabled(true);
  };

  document.getElementById("get-transform-matrix").onclick = function() {
    alert("The transform matrix is: [" + transform.getTransformMatrix() + "]\n" + 
    "You can use this matrix to transform the model when calling viewer.loadModel");    
  }
  
});
