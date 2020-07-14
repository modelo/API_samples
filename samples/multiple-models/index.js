var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });
var modelId1 = "p1wD3oYj";
var modelId2 = "91BJMg1o";
var modelId3 = "3rjVxXr4";

function updateProgress(progress) {
  var c = document.getElementById("progress");
}

var viewer1 = new Modelo.View.Viewer3D("model1");
viewer1.loadModel(modelId1, { onprogress: updateProgress });
viewer1.addInput(new Modelo.View.Input.Mouse(viewer1));
viewer1.addInput(new Modelo.View.Input.Touch(viewer1));
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer1);
viewer1.addTool(selectElementTool);
selectElementTool.setEnabled(true);

var viewer2 = new Modelo.View.Viewer3D("model2");
viewer2.loadModel(modelId2, { onprogress: updateProgress });
viewer2.addInput(new Modelo.View.Input.Mouse(viewer2));
viewer2.addInput(new Modelo.View.Input.Touch(viewer2));
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer2);
viewer2.addTool(selectElementTool);
selectElementTool.setEnabled(true);

var viewer3 = new Modelo.View.Viewer3D("model3");
viewer3.loadModel(modelId3, { onprogress: updateProgress });
viewer3.addInput(new Modelo.View.Input.Mouse(viewer3));
viewer3.addInput(new Modelo.View.Input.Touch(viewer3));
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer3);
viewer3.addTool(selectElementTool);
selectElementTool.setEnabled(true);

