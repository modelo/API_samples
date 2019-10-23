const modelId = "W1NM3grR";
const appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({
  endpoint: "https://build-portal.modeloapp.com",
  appToken
});

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
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
    // viewer.getScene().setElementsColor(elements.electromechanical, [1.0, 1.0, 1.0]);
    viewer.setEffectEnabled("Highlight", true);
    viewer.getRenderScene().getEffect("Highlight").addElements(elements.electromechanical, {
      emissiveColor: [1.0, 0.0, 0.0]
    });

    var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
    viewer.addTool(selectElementTool);
    selectElementTool.setEnabled(true);
  });

let settingFlag = [false, false, false, false];
let tmpPoints = [];
document.getElementById('configButtonPipline').onclick = function () {
  if ($('#configButtonPipline').hasClass('buttonActive')) {
    $('button').removeClass('buttonActive');
  } else {
    $('#configButtonPipline').addClass('buttonActive');
  }
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

let ribbon;
document.getElementById('configButtonAnimation').onclick = () => {
  if ($('.btn').hasClass('buttonActive')) {
    $('.btn').removeClass('buttonActive');
  } else {
    $('#configButtonAnimation').addClass('buttonActive');
  }
  const pointsArray = [[61541.709401, -126486.802841, -3695.236848],
  [57619.247141, -126486.802841, -3695.236848],
  [51727.136449, -126486.802841, -3695.236848],
  [49474.579165, -125166.390935, -3695.236848],
  [44371.704917, -125166.390935, -3695.236848],
  [44371.704917, -121963.288052, -3695.236848],
  [46163.72454, -121963.288052, -3426.229175],
  [92951.656527, -121963.288052, -3426.229175]];
  if (settingFlag[3]) {
    viewer.getScene().removeVisualize(ribbon);
    for (const key in elements) {
      viewer.getScene().setElementsVisibility(elements[key], true);
    }
    $('svg').empty();
    document.getElementById("panelLabel").style.visibility = 'hidden';
  } else {
    setRibbon([...pointsArray]);
  }
}

/**
 * Set elements visibility
 * @param {*} buttonId 
 * @param {*} index 
 * @param {*} type 
 */
function setElementsVisibility(buttonId, index, type) {
  document.getElementById("panelLabel").style.visibility = 'hidden';
  if ($(`.btn`).hasClass('buttonActive')) {
    $('.btn').removeClass('buttonActive');
  } else {
    $(`#${buttonId}`).addClass('buttonActive');
  }

  for (const key in elements) {
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
  viewer.getScene().setElementsVisibility(elements.building, false);
  viewer.getScene().setElementsVisibility(elements.structure, false);
  viewer.getScene().setElementsColor(elements.rooms, [1, 1, 1, 0.15]);
  ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  ribbon.setEnabled(true);
  viewer.getScene().addVisualize(ribbon); 
  ribbon.setParameter("width", 10);
  ribbon.setParameter("unitLenght", 1000);
  ribbon.setParameter("speed", 1);
  ribbon.setParameter("platteTexture", "./platte.png");

  pointsArray.forEach(function (point) {
    point[0] = point[0] / 304;
    point[1] = point[1] / 304;
    point[2] = point[2] / 304;
  });
  ribbon.addRibbon(pointsArray);

  const position3D = pointsArray[2];  
  viewer.setUpdateCallback(function () {
    setPanel(position3D);
  });
  settingFlag[3] = !settingFlag[3];
}

/**
 * Setting the panel when the model is update
 * @param {*} position3D 
 */
function setPanel(position3D) {
  const position2D = viewer.getCamera().project(position3D);
  if (tmpPoints.length > 0 && Math.abs(position2D[0] - tmpPoints[0]) < 3 && Math.abs(position2D[1] - tmpPoints[1]) < 3) {
    return;
  }
  tmpPoints = position2D;
  document.getElementById("panelLabel").style.visibility = 'visible';
  document.getElementById("panelLabel").style.left = position2D[0] + 50 + "px";
  document.getElementById("panelLabel").style.top = position2D[1] + 40 + "px";
  drawLine(position2D);
}

/**
 * Setting SVG lines to connect panel
 * @param {*} points 
 */
function drawLine(points) {
  const svg = document.getElementById('panelLine');
  $('svg').empty();

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  circle.setAttribute('cx', points[0]);
  circle.setAttribute('cy', points[1]);
  circle.setAttribute('r', 5);
  circle.setAttribute('fill', '#FF8247');

  line1.setAttribute("x1", points[0]);
  line1.setAttribute("y1", points[1]);
  line1.setAttribute("x2", points[0] + 70);
  line1.setAttribute("y2", points[1]);

  line2.setAttribute("x1", points[0] + 70);
  line2.setAttribute("y1", points[1])
  line2.setAttribute("x2", points[0] + 120);
  line2.setAttribute("y2", points[1] + 40);

  line1.setAttribute("style", "stroke: #FF8247; stroke-width: 2");
  line2.setAttribute("style", "stroke: #FF8247; stroke-width: 2");
  circle.setAttribute("style", "stroke: #FF8247; stroke-width: 2");

  svg.appendChild(circle);
  svg.appendChild(line1);
  svg.appendChild(line2);
}