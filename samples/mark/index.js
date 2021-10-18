var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

var markGraph = new Modelo.View.Tool.MarkGraph(viewer);
viewer.addTool(markGraph);
markGraph.setEnabled(true);

document.getElementById("marktype").onchange = function() {
  var t = document.getElementById("marktype").value;
  markGraph.setMarkType(parseInt(t));
};

viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("loading done");

  viewer.getEventEmitter().on("MarkGraph-Created", function(id){
    console.log('create mark success: ' + id);
  });
  viewer.getEventEmitter().on("MarkGraph-Removed", function(id){
    console.log('delete mark: ' + id);
  });
});
