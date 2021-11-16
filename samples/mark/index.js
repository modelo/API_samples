var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));
viewer.addInput(new Modelo.View.Input.Keyboard(viewer));

var markGraph = new Modelo.View.Tool.MarkGraph(viewer);
var gizmo = new Modelo.View.Tool.TransformGizmo(viewer);
viewer.addTool(markGraph);
viewer.addTool(gizmo);
markGraph.setEnabled(true);


document.getElementById("marktype").onchange = function() {
  var t = document.getElementById("marktype").value;
  markGraph.setMarkType(parseInt(t));
  viewer.getCanvas().focus();
};

document.getElementById("SelectType").onchange = function() {
  var t = document.getElementById("SelectType").value;
  markGraph.setSelectType(parseInt(t));
  viewer.getCanvas().focus();
};


document.getElementById("clearAll").onclick = function() {
  markGraph.reset();
};

document.getElementById("clearSelect").onclick = function(){
  markGraph.clearAllSelect();
}

document.getElementById("RectWithArrow").onchange = function(){
  var checked = document.getElementById("RectWithArrow").checked;
  markGraph.setRectArrowMode(checked ? 0 : -1);
}

document.getElementById("RandomColor").onchange = function(){
  var checked = document.getElementById("RandomColor").checked;
  markGraph.setDefaultColor(checked ? [Math.random(),Math.random(),Math.random()] : null);
}

// 这个开关表示
let useGizmo = false;
document.getElementById("Gizmo").onclick = function(){
  let marks = markGraph.getSelectMarks();
  // 这里目前只支持单个mark的gizmo操作 
  if(marks[0]){
    useGizmo = !useGizmo;
    gizmo.setDrawable(marks[0].drawable);
  }else{
    useGizmo = false;
  }
  gizmo.setEnabled(useGizmo);
}

viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("loading done");

  viewer.getEventEmitter().on("MarkGraph-Created", function(id){
    console.log('create mark success: ' + id);
  });
  viewer.getEventEmitter().on("MarkGraph-Removed", function(id){
    console.log('delete mark: ' + id);
  });

  $("#range1").range({
    min: 0.5,
    max: 4,
    start: 1,
    step: 0.1,
    onChange: function(value) {
      markGraph.setRectWidth(value);
    }
  });


});
