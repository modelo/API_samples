var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});

var miniMapContainer = document.getElementById('minimap-container');
var progressSlider = document.getElementById('progress');
var speedSlider = document.getElementById('speed');
var editmodeSelect = document.getElementById('editmode');
var playButton = document.getElementById('play');
var stopButton = document.getElementById('stop');
var heightSlider = document.getElementById('height');
var sketchButton = document.getElementById('sketch');

var addFirstPoint=false;
var mode = 0;
var isPlaying=false;
var playable=false;
viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    var navigation = new Modelo.View.Navigation(viewer);
    var miniMapService = new Modelo.View.NavigationMiniMap(miniMapContainer);

    // model loaded successfully
    // add mouse to control camera.
    var mouse = new Modelo.View.Input.Mouse(viewer);
    viewer.addInput(mouse);
    mouse.addMouseUpListener(function(mouse){
      if(mouse.button!==mouse.LEFT_BUTTON || mouse.moved) return;
      if(!addFirstPoint){
        var worldPosition = navigation.pinPoint(mouse.x, mouse.y);
        var miniMap = navigation.dumpMiniMap(undefined, undefined, undefined, undefined, undefined, undefined, true);
        miniMapImage = new Image();
        miniMapImage.src = miniMap;
        miniMapImage.onload = function(){
          console.log(miniMapImage.width, miniMapImage.height)
          var center = navigation.getMapCoord(worldPosition)
          miniMapService.miniMapImage = miniMapImage;
          miniMapService.mapCenter = [center.x, center.y];
          miniMapService.eventEmitter.on('afterAddMarker',(marker)=>{
            console.log('add marker');
            marker.mapZ = navigation.getViewHeight();
            navigation.lookAt(marker.mapX, marker.mapY);
            if(miniMapService.markers.length>1){
              playable=true;
              updateUI();
            }
            else{
              playable=false;
              updateUI();
            }
          });
          miniMapService.eventEmitter.on('afterRemoveMarker',(index)=>{
            console.log('remove marker');
            navigation.deleteKeyPoint(index);
            if(miniMapService.markers.length>1){
              playable=true;
              updateUI();
            }
            else{
              playable=false;
              updateUI();
            }
          });
          miniMapService.eventEmitter.on('changingPosition',(data)=>{
            // console.log('changing position');
            navigation.lookAt(data.x, data.y)
          });
          miniMapService.eventEmitter.on('changingRotation',(data)=>{
            // console.log('changing rotation');
            navigation.lookAt(data.x, data.y, data.atX, data.atY)
          });
          miniMapService.eventEmitter.on('afterEditPositionComplete',(data)=>{
            console.log('edit position complete')
            if(mode===0){//添加模式完成位置
            }
            else if(mode===1){ // 编辑模式完成位置变更
              navigation.adjustPathPoint(data.marker.id, data.x, data.y);
            }
          });
          miniMapService.eventEmitter.on('afterEditRotationComplete',(data)=>{
            console.log('edit rotation complete')
            if(mode===0){//添加模式完成旋转，添加一个keyPoint
              navigation.addKeyPoint(data.x, data.y);
              miniMapService.editMode = 0;
            }
            else if(mode===1){ // 编辑模式完成旋转
              navigation.adjustFocusPoint(data.marker.id, data.atX, data.atY);
            }
          });
          miniMapService.eventEmitter.on('navigate',()=>{
            var data = navigation.navigate();
            updateMiniMapAnimation(data,miniMapService);
          });
          miniMapService.eventEmitter.on('animationStopped',()=>{
            isPlaying=false;
            progressSlider.value=0;
            updateUI();
          })

          // UI事件
          progressSlider.oninput=function(e){
            console.log('jump to',e);
            var data = navigation.jumpTo(parseFloat(progressSlider.value)/100);
            console.log(data)
            updateMiniMapAnimation(data,miniMapService);
          }
          
          editmodeSelect.onchange = function(){
            if(editmodeSelect.value==='add'){
              miniMapService.editMode = 0;
              mode=0;
            }
            else if(editmodeSelect.value==='edit'){
              miniMapService.editMode = 1;
              mode=1;
            }
            else if(editmodeSelect.value==='remove'){
              miniMapService.editMode = 2;
              mode=2;
            }
          }
          playButton.onclick=function(){
            stopAnimation(miniMapService, navigation);
            miniMapService.playAnimation(navigation.getSteps());
            isPlaying=true;
            updateUI();
          }
          stopButton.onclick=function(){
            stopAnimation(miniMapService, navigation);
            isPlaying=false;
            updateUI();
          }

          var height = navigation.getViewHeightRatio();
          heightSlider.value = height*100;
          heightSlider.onchange=function(){
            console.log('height change');
            navigation.setViewHeightByRatio(parseFloat(heightSlider.value)/100);
            var miniMap = navigation.dumpMiniMap(undefined, undefined, undefined, undefined, undefined, undefined, true);
            miniMapService.miniMapImage = new Image();
            miniMapService.miniMapImage.src = miniMap;
            miniMapService.setMarkersEnabledByHeight(navigation.getViewHeight());
          }

          speedSlider.value = navigation.speed;
          speedSlider.onchange=function(){
            console.log('speed change');
            stopAnimation(miniMapService, navigation);
            navigation.setSpeed(parseFloat(speedSlider.value));
          }

          sketchButton.onchange=function(){
            console.log('sketch change');
            var miniMap = navigation.dumpMiniMap(undefined, undefined, undefined, undefined, undefined, undefined, true, sketchButton.checked);
            miniMapService.miniMapImage = new Image();
            miniMapService.miniMapImage.src = miniMap;
          }
          
          var canvasCoord = miniMapService.miniMapCoordToCanvasCoord(center.x, center.y);
          miniMapService.addDefaultMarker(canvasCoord[0],canvasCoord[1]);
          
          addFirstPoint=true;
          updateUI();
        }
      }
    });
  });

  function stopAnimation(miniMapService, navigation){
    miniMapService.stopAnimation();
    miniMapService.restart();
    navigation.restart();
    navigation.stop();
    navigation.jumpTo(0)
    progressSlider.value = 0;
  }
  function updateMiniMapAnimation(data, miniMapService){
    var info = data.info;
    if(!data.update){
      miniMapService.stopAnimation();
      return;
    }
    if(info){
      miniMapService.setAnimatingMarkerPositionFromMapCoord(info[0],info[1]);
      miniMapService.setAnimatingMarkerRotationFromMapCoord(info[0], info[1], info[2], info[3]);              
    }
    // console.log(data.progress)
    progressSlider.value = data.progress*100;
  }
  function updateUI(){
    if(addFirstPoint){
      heightSlider.removeAttribute('disabled')
      editmodeSelect.removeAttribute('disabled')
    }
    else{
      heightSlider.setAttribute('disabled',true)
      editmodeSelect.setAttribute('disabled',true)
    }
    if(playable){
      progressSlider.removeAttribute('disabled')
      playButton.removeAttribute('disabled')
    }
    else{
      progressSlider.setAttribute('disabled',true)
      playButton.setAttribute('disabled',true)
      stopButton.setAttribute('disabled',true)
    }
    if(isPlaying){
      playButton.setAttribute('disabled',true);
      stopButton.removeAttribute('disabled');
      heightSlider.setAttribute('disabled',true);
      editmodeSelect.setAttribute('disabled',true);
      progressSlider.removeAttribute('disabled');
    }
    else{
      stopButton.setAttribute('disabled',true);
      progressSlider.setAttribute('disabled',true);
      heightSlider.removeAttribute('disabled');
      editmodeSelect.removeAttribute('disabled');
      if(playable){
        playButton.removeAttribute('disabled');
      }
    }
  }