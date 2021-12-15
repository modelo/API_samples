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

viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    var mouse = new Modelo.View.Input.Mouse(viewer);
    viewer.addInput(mouse);

    var navigation = new Modelo.View.MiniMapNavigationTool(viewer,miniMapContainer);
    viewer.addTool(navigation);
    navigation.setEnabled(true);
    viewer.getEventEmitter().on('firstPointAdded', ()=>{
      var height = navigation.getViewHeightRatio();
      heightSlider.value = height*100;
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
  });
  function updateUI(navigation){
    if(navigation.firstPointAdded){
      heightSlider.removeAttribute('disabled')
      editmodeSelect.removeAttribute('disabled')
    }
    else{
      heightSlider.setAttribute('disabled',true)
      editmodeSelect.setAttribute('disabled',true)
    }
    if(navigation.playable){
      progressSlider.removeAttribute('disabled')
      playButton.removeAttribute('disabled')
    }
    else{
      progressSlider.setAttribute('disabled',true)
      playButton.setAttribute('disabled',true)
      stopButton.setAttribute('disabled',true)
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
  }