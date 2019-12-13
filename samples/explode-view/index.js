var modelId = "z8AP4qYX";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

var exploeded = false;
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);


viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
  });
<<<<<<< HEAD
=======
  
>>>>>>> origin/newSamples

const water = [modelId+"+0/100002"];
const road = [modelId+"+0/100003"];
const ground = [modelId+"+0/100008"];
const greenland = [modelId+"+0/100010"];
const sportsbuildings = [modelId+"+0/100009"];
const institutionalbuildings = [modelId+"+0/100007"];
const commercialbuildings = [modelId+"+0/100004"];
const residentialbuildings = [modelId+"+0/100006"];
const facilitybuildings = [modelId+"+0/100005"];


document.getElementById("explode").onclick = function() {
  viewer.enterExplodedView([road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 0], [0,0,500],[0,0,1000],[0, 0, 1000], [0, 0, 1000], [0, 0, 1000], [0, 0, 1000]]);
  exploeded =!exploeded;
};

document.getElementById("restore").onclick = function() {
  viewer.quitExplodedView();
  exploeded =!exploeded;
  selectElementTool.pick([], false);
};

document.getElementById("commercial").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,0],[0, 0, 0], [0, 0, 1000], [0, 0, 0], [0, 0, 0]]);
    selectElementTool.pick(commercialbuildings, true);
    exploeded =!exploeded;
  }
<<<<<<< HEAD
};

document.getElementById("residential").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,0],[0, 0, 0], [0, 0, 0], [0, 0, 1000], [0, 0, 0]]);
    selectElementTool.pick(residentialbuildings, true);
    exploeded =!exploeded;
  }
};

document.getElementById("institutional").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,0],[0, 0, 1000], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    selectElementTool.pick(institutionalbuildings, true);
    exploeded =!exploeded;
  }
};

document.getElementById("sports").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,1000],[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    selectElementTool.pick(sportsbuildings, true);
    exploeded =!exploeded;
  }
};

=======
};

document.getElementById("residential").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,0],[0, 0, 0], [0, 0, 0], [0, 0, 1000], [0, 0, 0]]);
    selectElementTool.pick(residentialbuildings, true);
    exploeded =!exploeded;
  }
};

document.getElementById("institutional").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,0],[0, 0, 1000], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    selectElementTool.pick(institutionalbuildings, true);
    exploeded =!exploeded;
  }
};

document.getElementById("sports").onclick = function() {
  if(exploeded){
    viewer.quitExplodedView() 
    selectElementTool.pick([], false);
    exploeded =!exploeded;
  }
  else{
    viewer.enterExplodedView([ground,water,road,greenland,sportsbuildings, institutionalbuildings, commercialbuildings, residentialbuildings, facilitybuildings,], [[0, 0, 10],[0, 0, 0],[0, 0, 0], [0,0,0],[0,0,1000],[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    selectElementTool.pick(sportsbuildings, true);
    exploeded =!exploeded;
  }
};

>>>>>>> origin/newSamples


