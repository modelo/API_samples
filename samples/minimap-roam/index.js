var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});

var miniMapContainer = document.getElementById('minimap-container');
var progressSlider = document.getElementById('time');
var speedSlider = document.getElementById('speed');
var editmodeSelect = document.getElementById('editmode');
var playButton = document.getElementById('play');
var stopButton = document.getElementById('stop');
var heightSlider = document.getElementById('height');
var sketchButton = document.getElementById('sketch');
// var enableButton = document.getElementById('enable');
var saveButton = document.getElementById('save');
var addButton = document.getElementById('add');
var removeButton = document.getElementById('remove');
var pathsSelect = document.getElementById('paths');
var hint = document.getElementById('hint');
var paths = [];
var nameCount = 0;
var currentPath = -1;

viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    var mouse = new Modelo.View.Input.Mouse(viewer);
    viewer.addInput(mouse);

    var navigation = new Modelo.View.Tool.MiniMapNavigation(viewer,miniMapContainer);
    viewer.addTool(navigation);

    viewer.getEventEmitter().on('firstPointAdded', ()=>{
      var height = navigation.getViewHeightRatio();
      heightSlider.value = height*100;
      updateUI(navigation);
    })
    viewer.getEventEmitter().on('afterAddMarker',(marker)=>{
      updateUI(navigation);
    });
    viewer.getEventEmitter().on('afterRemoveMarker',(index)=>{
      updateUI(navigation);
    });
    viewer.getEventEmitter().on('navigate',(data)=>{
      progressSlider.value = data.progress*100;
    });
    viewer.getEventEmitter().on('animationStopped',()=>{
      progressSlider.value=0;
      updateUI(navigation);
    });

    // UI
    progressSlider.oninput=function(e){
      navigation.jumpTo(parseFloat(progressSlider.value)/100);
    }
    
    editmodeSelect.onchange = function(){
      if(editmodeSelect.value==='add'){
        navigation.editMode = 0;
      }
      else if(editmodeSelect.value==='edit'){
        navigation.editMode = 1;
      }
      else if(editmodeSelect.value==='remove'){
        navigation.editMode = 2;
      }
    }
    playButton.onclick=function(){
      navigation.stopAnimation();
      navigation.playAnimation();
      updateUI(navigation);
    }
    stopButton.onclick=function(){
      navigation.stopAnimation();
      progressSlider.value = 0;
      updateUI(navigation);
    }

    heightSlider.onchange=function(){
      console.log('height change');
      navigation.setViewHeightByRatio(parseFloat(heightSlider.value)/100);
    }

    speedSlider.value = navigation.speed;
    speedSlider.onchange=function(){
      console.log('speed change');
      navigation.stopAnimation();
      navigation.speed = parseFloat(speedSlider.value);
    }

    sketchButton.onchange=function(){
      console.log('sketch change');
      navigation.changeMiniMapStyle(sketchButton.checked);
    }

    saveButton.onclick=function(){
      if(navigation.playable){
        if(currentPath>-1){
          paths[currentPath].data = navigation.exportData();
        }
      }
    }

    addButton.onclick = function(){
      currentPath = paths.length;
      nameCount++;
      const name = '漫游'+nameCount;
      paths.push({
        name: name,
        data: undefined
      });
      var option = document.createElement('option');
      option.setAttribute('value',''+currentPath);
      option.innerHTML = name;
      pathsSelect.appendChild(option);
      pathsSelect.value = ''+currentPath;
      navigation.setEnabled(true)
      navigation.restart();
      updateUI(navigation);
    }

    removeButton.onclick=function(){
      if(currentPath>-1){
        navigation.clearData();
        paths.splice(currentPath,1);
        pathsSelect.removeChild(pathsSelect.children[currentPath]);
        currentPath--;
        pathsSelect.value = ''+currentPath;
        if(currentPath>-1 && paths[currentPath].data){
          navigation.loadData(paths[currentPath].data);
        }
        updateUI(navigation);
      }
    }

    pathsSelect.onchange=function(e){
      currentPath = parseInt(pathsSelect.value);
      if(currentPath>-1 && paths[currentPath].data){
        navigation.loadData(paths[currentPath].data);
      }
      else{
        navigation.clearData();
        navigation.restart();
      }
      updateUI(navigation);
    }
  });
  function updateUI(navigation){
    if(navigation.firstPointAdded){
      heightSlider.removeAttribute('disabled')
      editmodeSelect.removeAttribute('disabled')
      hint.setAttribute('style','display:none;')
    }
    else{
      heightSlider.setAttribute('disabled',true)
      editmodeSelect.setAttribute('disabled',true)
      hint.setAttribute('style','display:block;')
    }
    if(navigation.playable){
      progressSlider.removeAttribute('disabled')
      playButton.removeAttribute('disabled')
      saveButton.removeAttribute('disabled')
    }
    else{
      progressSlider.setAttribute('disabled',true)
      playButton.setAttribute('disabled',true)
      stopButton.setAttribute('disabled',true)
      saveButton.setAttribute('disabled',true)
    }
    if(navigation.isPlaying){
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
      if(navigation.playable){
        playButton.removeAttribute('disabled');
      }
    }
    if(paths.length>0){
      pathsSelect.removeAttribute('disabled')
      removeButton.removeAttribute('disabled')
    }
    else{
      pathsSelect.setAttribute('disabled',true)
      removeButton.setAttribute('disabled',true)
    }
  }