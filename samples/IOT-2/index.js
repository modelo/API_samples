const modelId = "p1wbbNrj";
const appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({
  endpoint: "https://build-portal.modeloapp.com",
  appToken
});

const viewer = new Modelo.View.Viewer3D("model");
viewer
  .loadModel(modelId, progress => {
    // /assets/js/utils.js
    updateProgress(progress);
  })
  .then(() => {
    setDarkTheme(viewer);
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    const keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
    viewer.getScene().setElementsColor(elements.electromechanical, [1.0, 1.0, 1.0]);
    viewer.setEffectEnabled("Highlight", true);
    viewer.getRenderScene().getEffect("Highlight").addElements(elements.electromechanical, {
      emissiveColor: [1.0, 0.0, 0.0]
    });

    var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);
  });

let settingFlag = [false, false, false, false];
document.getElementById('configButtonPipline').onclick = function () {
  $('button').removeClass('buttonActive');
  $('#configButtonPipline').addClass('buttonActive');
  viewer.setEffectEnabled("Highlight", !settingFlag[0]);
  viewer.setEffectParameter("Highlight", "radius", 1);
  viewer.setEffectParameter("Highlight", "intensity", 0.3);
  settingFlag[0] = !settingFlag[0];
}

document.getElementById('configButtonStructure').onclick = function () {
  setElementsVisibility('configButtonStructure', 1, 'structure')
}

document.getElementById('configButtonSkin').onclick = function () {
  setElementsVisibility('configButtonSkin', 2, 'electromechanical')
}

document.getElementById('configButtonAnimation').onclick =  () => {
  $('button').removeClass('buttonActive');
  $('#configButtonAnimation').addClass('buttonActive');
  const pointsArray = [[61541.709401, -126486.802841, -3695.236848],
    [57619.247141, -126486.802841, -3695.236848],
    [51727.136449, -126486.802841, -3695.236848],
    [49474.579165, -125166.390935, -3695.236848],
    [44371.704917, -125166.390935, -3695.236848],
    [44371.704917, -121963.288052, -3695.236848],
    [46163.72454, -121963.288052, -3426.229175],
    [92951.656527, -121963.288052, -3426.229175]];
    setRibbon([...pointsArray]);
}

function setElementsVisibility(buttonId, index, type) {
  $('button').removeClass('buttonActive');
  $(`#${buttonId}`).addClass('buttonActive');
  for(const key in elements) {
    if (type === key) {
      viewer.getScene().setElementsVisibility(elements[key], !settingFlag[index]);
    } else {
      viewer.getScene().setElementsVisibility(elements[key], settingFlag[index]);
    }
  }
  settingFlag[index] = !settingFlag[index];
}

/**
 * Setting AnimatingRibbon
 * @param {*} pointsArray 
 */
function setRibbon(pointsArray) {
  for(const key in elements) {
    if ('structure' !== key) {
      viewer.getScene().setElementsVisibility(elements[key], false);
    }
  }
  //viewer.getScene().setElementsColor(elements.structure, [1, 1, 1, 0]);


  const ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());

  ribbon.setEnabled(true);
  viewer.getScene().addVisualize(ribbon);
  ribbon.setParameter("width", 5);
  ribbon.setParameter("unitLenght", 1000);
  ribbon.setParameter("speed", 1);
  ribbon.setParameter("platteTexture", "./platte.png");

  pointsArray.forEach(function(point) {
    point[0] = point[0] / 304;
    point[1] = point[1] / 304;
    point[2] = point[2] / 304;
  });
  ribbon.addRibbon(pointsArray);
  ribbon.setScaling(1.6, 0.6, 0.6);
}