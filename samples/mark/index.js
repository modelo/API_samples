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
  removeRibbons();
};

document.getElementById('clearSelectedMark').onclick = function(){
  let selectMarks = markGraph.getSelectMarks();
  for(let mark of selectMarks){
    markGraph.remove(mark);
  }
}

document.getElementById("clearSelect").onclick = function(){
  markGraph.clearAllSelect();
}

document.getElementById("RectWithArrow").onchange = function(){
  var checked = document.getElementById("RectWithArrow").checked;
  markGraph.setRectArrowMode(checked ? 0 : -1);
}

document.getElementById("RandomColor").onchange = function(){
  var checked = document.getElementById("RandomColor").checked;
  markGraph.setDefaultColor(checked ? [Math.random(),Math.random(),Math.random()] : null,true); // 覆盖全部mark
}

// 生成动态流线
let ribbonGroups = {};
function createRibbon(id,points,platte){
  points.map(point => [point[0] / 304, point[1] / 304, point[2] / 304]); // 单位转换
  let ribbonGroup = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  ribbonGroup.setEnabled(true);
  viewer.getScene().addVisualize(ribbonGroup);
  // TODO：下面的参数客户可以根据自己的需要自行调节
  ribbonGroup.setParameter("width", 10);
  ribbonGroup.setParameter("unitLenght", 50);
  ribbonGroup.setParameter("speed", -0.5);
  ribbonGroup.setParameter("platteTexture", platte);
  ribbonGroup.setParameter("depthTest", false);
  ribbonGroup.addRibbon(points);
  ribbonGroups[id] = ribbonGroup;
}

function removeRibbon(id){
  let ribbon = ribbonGroups[id];
  if(ribbon){
    ribbon.setEnabled(false);
    viewer.getScene().removeVisualize(ribbon);
  }
}

// 清空动态流线
function removeRibbons(){
  for(let id in ribbonGroups){
    removeRibbon(id);
  }
  ribbonGroups = {};
}

var isStreamLine = false;
document.getElementById("streamLine").onchange = function(){
  isStreamLine = document.getElementById("streamLine").checked;
  // 获得所有的线
  let markLines = markGraph.getLines();
  if(isStreamLine){
    // 分别获得每一条线的点
    for(let line of markLines){
      let linePoints = line.getKeyPoints();
      // 隐藏线
      line.setVisible(false);
      createRibbon(line.id,linePoints,"warm.png");
    }
  }else{
    for(let line of markLines){
      line.setVisible(true);
    }
    removeRibbons();
  }
}

// 这个开关表示mark得gizmo
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

// 参数化绘制点线面
let type = '';
let markParameters = [];
document.getElementById("addKeyPoint").onclick = function(){
  let keyPoint = [parseFloat(document.getElementById('setx').value),
  parseFloat(document.getElementById('sety').value),
  parseFloat(document.getElementById('setz').value)];
  markParameters.push(keyPoint);
  updateKeyPoints(markParameters);
}
document.getElementById("clearKeyPoints").onclick = function(){
  markParameters = [];
  updateKeyPoints(markParameters);
}
document.getElementById("drawMark").onclick = function(){
  var marktype = parseInt(document.getElementById("marktype2").value);
  if(marktype===1){
    markParameters.forEach((point)=>{
      markGraph.drawMark(point,marktype);
    })
    markParameters = [];
    updateKeyPoints(markParameters);
  }else if(!isNaN(marktype)){
    markGraph.drawMark(markParameters,marktype);
    markParameters = [];
    updateKeyPoints(markParameters);
  }
}

function updateKeyPoints(markParameters){
  let value = '';
  for(let mark of markParameters){
    value += '{'+ 'x: '+mark[0]+','+ 'y: '+mark[1]+',' + 'z: '+ mark[2] +'}，'
  }
  document.getElementById('keyPoints').innerHTML = value;
}


viewer.loadModel(modelId, updateProgress).then(() => {
  // success
  console.log("loading done");

  viewer.getEventEmitter().on("MarkGraph-Created", function(id){
    console.log('create mark success: ' + id);
    if(isStreamLine){
      let mark = this.markGraph.getMark(id);
      if(mark.type === 'line'){
        mark.setVisible(false);
        createRibbon(id,mark.getKeyPoints(),"warm.png");
      }
    }
  });
  viewer.getEventEmitter().on("MarkGraph-Removed", function(id){
    console.log('delete mark: ' + id);
    if(isStreamLine){
      let mark = this.markGraph.getMark(id);
      if(mark.type === 'line'){
        removeRibbon(id);
      }
    }
  });
  viewer.getEventEmitter().on("MarkGraph-Selected", function(selects){
    console.log('select mark:',selects);
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
