var modelId = "offlinemodel";
//可自定义模型Id
 appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});

viewer.setShadowContrast(0.5);
viewer.setLightingLatitude(1);
viewer.setLightingLongitude(1);
viewer.setLightingIntensity(1);
viewer.setShadowEnabled(true);
viewer.setEffectEnabled("SSAO", true);

var exploeded = false;
var spliced = false;

viewer.loadModel(modelId, progress => {
  // second parameter is an optional progress callback
  
  const c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
// },true,true,'./multiLevel').then(() => {
}, true, true, './model').then(() => {
  const keyboard = new Modelo.View.Input.Keyboard(viewer);
  viewer.addInput(keyboard);
  keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
          viewer.destroy();
      }
  });
  
  keyboard.addKeyUpListener(keyboard => {
    
    let keycode = keyboard.key;
    if (keycode == ' ') {
      if (exploeded) {
        viewer.quitExplodedView();
        exploeded = !exploeded;
      } else {
    
        viewer.explodeLayer(modelId, 20);
        exploeded = !exploeded;
      }
    } else if (keycode == 'a') {
      viewer.spliceLayer(modelId, 20);
    }
    else if (keycode == 'c') {
      viewer.spliceElements(modelId, 2);
    }
    else if (keycode == 'b') {
      viewer.quitExplodedView();
    }
  });
});

viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
// add keyboard callback.
