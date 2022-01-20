let map;
var modelId = "q8ZdPw1a";
var model2Id = "VYn6bJYJ";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});
viewer.setLazyRenderingEnabled(false);

var position3D;
var markColor = [247/255 , 82/255, 35/255];
var markOpacity = 0.8;
var infoBox = document.getElementById("infobox");
var infoBox2 = document.getElementById("infobox2");
var selectedMark;
var markGraph;
var stationSelect = document.getElementById('stations');
var stationType = stationSelect.value;
stationSelect.onchange=function(){
  stationType = stationSelect.value;
  addMarks(stationType);
}
var lonlatHint = document.getElementById('lonlatHint');

const model2longitude = 121.495208;
const model2latitude = 31.241954;
const longitude = 121.498;
const latitude = 31.2402;
const level = 14;
const width = 10000;
const height = 6000;
const maximumTilesNumber = 40;
function addMap(type) {
  document.getElementById("progress").innerHTML = "Loading Map";
  let config = {};
  if (type === "esri") {
    config.url = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  } else if (type === "tianditu") {
    const token = document.getElementById("token").value;
    config.url =
      "http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" +
      token;
    config.subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
  } else if (type === "openstreetmap") {
    config.url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    config.subdomains = ["a", "b", "c"];
  }
  viewer
    .getScene()
    .addMap({
      centerLongitude: longitude,
      centerLatitude: latitude,
      level: level,
      width: width,
      height: height,
      imageryProviderOptions: config,
      maximumTilesNumber:maximumTilesNumber
    })
    .then((result) => {
      map = result;
      var mouse = new Modelo.View.Input.Mouse(viewer);
      mouse.addMouseUpListener(mouse => {
        if (!mouse.moved) {
          var position = viewer.getCamera().unproject(mouse.x, mouse.y);
          if(position){
            var cartographic = map.sceneCoordinateToCartographic(position[0], position[1], position[2]);
            lonlatHint.innerHTML = '经度: '+(cartographic[0]/Math.PI*180).toFixed(6) +'° 纬度: '+ (cartographic[1]/Math.PI*180).toFixed(6)+'°';
          }
        }
      });
      // 将经纬度转成场景坐标
      viewer.loadModel(modelId).then(() => {
        viewer.setMaterialParameter(modelId+'.white_0', "color", [0.7,0.7,0.7]);

        var touch = new Modelo.View.Input.Touch(viewer);
        viewer.addInput(mouse);
        viewer.addInput(touch);
        mouse.add
        console.log("loading done");
        markGraph = new Modelo.View.Tool.MarkGraph(viewer);
        viewer.addTool(markGraph);
        markGraph.setEnabled(true);

        const extent = map.extentInCartographic;
        console.log(extent.west*180/Math.PI, extent.south*180/Math.PI, extent.east*180/Math.PI, extent.north*180/Math.PI);
        console.log(map.centerInCartographic.x*180/Math.PI, map.centerInCartographic.y*180/Math.PI);
        console.log("地图绘制完成");
        document.getElementById("progress").innerHTML = "Map Loaded";

        addMarks(stationType);
        viewer.getEventEmitter().on("MarkGraph-Selected", function(id){
          console.log('create mark success: ' + id);
          var mark = markGraph.getMark(id);
          if(selectedMark){
            markGraph.setMarkDiffuse(selectedMark, markColor)
            markGraph.setMarkOpacity(selectedMark, markOpacity)
          }
          markGraph.setMarkDiffuse(id, [1,0,0]);
          markGraph.setMarkOpacity(id, 1)
          selectedMark = mark;
          popUp(mark.userData)
        });
        viewer.getEventEmitter().on("MarkGraph-SelectionCleared", function(id){
          if(selectedMark){
            markGraph.setMarkDiffuse(selectedMark, markColor)
            markGraph.setMarkOpacity(selectedMark, markOpacity)
          }
          infoBox.style.display='none';
        });
        
        viewer.setUpdateCallback(function() {
          if(position3D){
            var position2D = viewer.getCamera().project(position3D);
            infoBox.style.left = position2D[0] + "px";
            infoBox.style.top = position2D[1]-10 + "px";
          }
          if(position){
            var position2D = viewer.getCamera().project(position);
            infoBox2.style.left = position2D[0]+110 + "px";
            infoBox2.style.top = position2D[1]+50 + "px";
          }
        });
      });
      // 根据经纬度放置东方明珠模型
      position = map.cartographicToSceneCoordinate(model2longitude/180*Math.PI,model2latitude/180*Math.PI,0);
      viewer.loadModel(model2Id, {initialTransform: [1,0,0,0, 0,1,0,0, 0,0,1,0, position[0],position[1],position[2],1]}, false).then(() => {
        infoBox2.style.display='block';
        position[2]=1200
      });
      var ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
      ribbon.setEnabled(true);
      viewer.getScene().addVisualize(ribbon);
      ribbon.setParameter("width", 3);
      ribbon.setParameter("unitLenght", 60000);
      ribbon.setParameter("speed", 0.15);
      ribbon.setParameter("platteTexture", "./platteMetro.png");
      metrolines.forEach(line=>{
        line.coordinates.forEach(function (point) {
          var coord = map.cartographicToSceneCoordinate(point[0]/180*Math.PI,point[1]/180*Math.PI)
          point[0] = coord[0];
          point[1] = coord[1];
          point[2] = 0;
        });
        ribbon.addRibbon(line.coordinates);
      });
    })
    .catch((e) => {
      document.getElementById("progress").innerHTML = e;
    });
}

function addMarks(type){
  selectedMark = undefined;
  infoBox.style.display='none';
  markGraph.reset();
  var stations;
  if(type==='bus'){
    stations = busStations;
  }
  else{
    stations = metroStations;
  }
  for (var i = 0; i < stations.length; i++) {
    var poi = stations[i];
    var lonlat = poi.lonlat.split(' ').map(ele=>parseFloat(ele));
    var xy = map.cartographicToSceneCoordinate(lonlat[0]/180*Math.PI,lonlat[1]/180*Math.PI);
    var position = [xy[0], xy[1], 10];
    var mark = markGraph.drawMark(position, Modelo.View.DrawMode.POINT);
    mark.userData = {
      name: poi.name,
      stationData: poi.stationData,
      position: position
    };
    markGraph.setMarkDiffuse(mark, markColor);
    markGraph.setMarkOpacity(mark, markOpacity)
  }
}

function popUp(userData){
  position3D = userData.position;
  infoBox.style.display = 'block';
  var content = infoBox.children[0];
  content.children[0].innerHTML = userData.name;
  content.children[1].innerHTML = userData.stationData.map(ele=>ele.lineName).join(', ');
}
addMap('esri');