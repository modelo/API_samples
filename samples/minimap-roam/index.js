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
var saveButton = document.getElementById('save');
var addButton = document.getElementById('add');
var removeButton = document.getElementById('remove');
var pathsSelect = document.getElementById('paths');
var hint = document.getElementById('hint');

var paths = []; // 存储序列化的漫游数据
var nameCount = 0;
var currentPath = -1; // 当前激活的漫游

viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    var mouse = new Modelo.View.Input.Mouse(viewer);
    viewer.addInput(mouse);

    // 初始化漫游工具
    var navigation = new Modelo.View.Tool.MiniMapNavigation(viewer,miniMapContainer);
    viewer.addTool(navigation);

    // 添加第一个点后，设置高度slider，更新UI界面
    viewer.getEventEmitter().on('firstPointAdded', ()=>{
      var height = navigation.getViewHeightRatio();
      heightSlider.value = height*100;
      updateUI(navigation);
    })
    // 每次添加一个关键点，更新一次UI界面
    viewer.getEventEmitter().on('afterAddMarker',(marker)=>{
      updateUI(navigation);
    });
    // 每次移除一个关键点，更新一次UI界面
    viewer.getEventEmitter().on('afterRemoveMarker',(index)=>{
      updateUI(navigation);
    });
    // 动画播放时，每一帧更新一次播放进度条
    viewer.getEventEmitter().on('navigate',(data)=>{
      progressSlider.value = data.progress*100;
    });
    // 动画播放结束后, 进度条归零，更新UI界面
    viewer.getEventEmitter().on('animationStopped',()=>{
      progressSlider.value=0;
      updateUI(navigation);
    });

    // UI
    progressSlider.oninput=function(e){
      // 进度条拖动时更新场景视角
      navigation.jumpTo(parseFloat(progressSlider.value)/100);
    }
    
    // 模式切换时，更新漫游工具的模式，0: 添加，1: 编辑, 2: 删除
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
    // 点击播放按钮后, 停止之前动画，重新播放动画，更新UI界面
    playButton.onclick=function(){
      navigation.stopAnimation();
      navigation.playAnimation();
      updateUI(navigation);
    }
    // 点击停止按钮后, 停止之前动画，更新UI界面
    stopButton.onclick=function(){
      navigation.stopAnimation();
      updateUI(navigation);
    }

    // 拖动高度slider时，更新漫游视角的高度
    heightSlider.onchange=function(){
      console.log('height change');
      navigation.setViewHeightByRatio(parseFloat(heightSlider.value)/100);
    }

    // 拖动速度slider时，先停止动画播放，然后设置漫游速度
    speedSlider.value = navigation.speed;
    speedSlider.onchange=function(){
      console.log('speed change');
      navigation.stopAnimation();
      navigation.speed = parseFloat(speedSlider.value);
    }

    // 切换建筑师模式按钮时，更新小地图样式
    sketchButton.onchange=function(){
      console.log('sketch change');
      navigation.changeMiniMapStyle(sketchButton.checked);
    }

    // 点击保存按钮，保存序列化数据
    saveButton.onclick=function(){
      if(navigation.playable){
        if(currentPath>-1){
          paths[currentPath].data = navigation.exportData();
        }
      }
    }

    // 点击添加按钮，重置漫游工具，更新UI界面
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

    // 点击删除按钮，清空漫游工具内的数据，删除之前保存在paths里对应的序列化数据
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

    // 切换漫游数据时，用loadData加载保存的序列化数据
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
  // 根据漫游工具中的状态，更新UI界面
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