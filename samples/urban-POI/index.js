let dataBillboard = [];
document.getElementById('configButton').onclick = () => {
  const configValues = $('#configForm').serializeArray();
  if (configValues) {
    dataBillboard.map((billboard, index) => {
      console.log((configValues[index * 3 + 1].value));
      billboard.map(item => {
        !!configValues[index * 3].value && item.setContent(configValues[index * 3].value);
        !!configValues[index * 3 + 1].value && item.setScaling(...JSON.parse(configValues[index * 3 + 1].value));
        !!configValues[index * 3 + 2].value && item.setColor(JSON.parse(configValues[index * 3 + 2].value));
      });
    })
  }
}

const modelId = "j1mXXDrb";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

const metroData = [
  [-2442.386679, 867.72189, 0],
  [-1313.921392, 1108.856742, 0],
  [-118.579776, 786.611134, 0],
  [494.232715, -1207.027391, 0],
  [-1095.344353, -1440.843486, 0],
  [-2990.725919, -838.96374, 0],
  [137.79681, -1969.030255, 0],
  [154.541162, -2307.31924, 0]
]

const gasStationData = [
  [534.366428, 729.020459, 0],
  [5.142311, 1599.65624, 0],
  [-336.400774, 60.928697, 0],
  [-1180.658937, 801.840325, 0],
  [-1618.838196, 356.9503, 0],
  [-1030.673089, -64.848875, 0]
]

const busStopData = [
  [-312.628626, 45.909458, 0],
  [-72.480506, 21.626893, 0],
  [261.3878, 98.211497, 0],
  [206.081227, 321.710782, 0],
  [21.320388, 611.236447, 0],
  [-214.11766, 932.272867, 0],
  [-392.30014, 1152.604702, 0],
  [-856.028752, 1116.464248, 0],
  [-559.112647, 1283.195715, 0],
  [-1196.475084, 786.656182, 0],
  [-1378.799011, 584.840635, 0],
  [-1683.511597, 410.556312, 0],
  [-1462.85443, 125.578636, 0],
  [-1306.355855, -171.175052, 0],
  [-752.561755, 58.009803, 0],
  [-655.592743, -120.091135, 0],
  [-890.381292, 403.085498, 0],
  [-783.829387, 506.30787, 0],
  [-592.572065, 787.306514, 0],
  [474.816443, 325.122024, 0],
  [343.656472, 606.120335, 0],
  [483.587087, 716.489522, 0],
  [317.586661, 898.244993, 0],
  [125.435883, 722.174091, 0],
  [-226.949879, 1413.543604, 0],
  [-440.622313, 1332.492386, 0],
  [-487.401532, 1609.592539, 0],
  [-680.933015, 1507.750706, 0],
  [548.314804, 119.246071, 0],
  [909.876917, 167.243578, 0],
  [375.655144, 42.661633, 0],
  [586.926895, 775.857919, 0],
  [489.304854, 1024.056599, 0],
  [738.029763, 1154.833209, 0],
  [866.83288, 912.357671, 0],
  [225.515164, 1380.5995, 0],
  [1.524219, 1632.876587, 0],
  [-945.354211, 1392.965468, 0],
  [-1405.373446, 1008.529881, 0],
  [-1607.984594, 910.184275, 0]
]

/**
 * 
 * @param {*} viewer Modelo.View.View3D
 * @param {*} data  data to show text3D and pawns
 * @param {*} text3DConfig text3D config options
 * @param {*} pawnConfig pawn config options
 */
function setText3DAndPawn(viewer, data, text3DConfig, pawnConfig) {
  return data.map((item, index) => {
    const text = new Modelo.View.Text3DBillboard(text3DConfig.textContent + index, viewer.getResourceManager(), viewer.getMaterialManager());
    text.setContent(text3DConfig.textContent);
    text.setTranslation(item[0] * 3.28, item[1] * 3.28, 250);
    text.setScaling(...text3DConfig.scale);
    text.setColor(text3DConfig.color);
    text.setFaceCameraZ(text3DConfig.faceCameraZ);
    viewer.getScene().addText3D(text);

    const image = new Image();
    image.src = pawnConfig.imgSrc;
    image.onload = function () {
      const pawnBillboard = new Modelo.View.PawnBillboard(text3DConfig.textContent + index, viewer.getResourceManager(), viewer.getMaterialManager());
      pawnBillboard.createTexturedQuad(image);
      pawnBillboard.setScaling(...pawnConfig.scale);
      pawnBillboard.setTranslation(item[0] * 3.28, item[1] * 3.28, 400);
      viewer.getScene().addPawn(pawnBillboard);
    }
    return text;
  }); 
}

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.loadModel(modelId, progress => {
  // /assets/js/utils.js
  updateProgress(progress);
}).then(() => {
  setDarkTheme(viewer);
  // load metro data
  dataBillboard[0] = setText3DAndPawn(
    viewer,
    metroData,
    {
      textContent: 'metro',
      scale: [300, 30, 300],
      color: [1, 0.3, 0.2],
      faceCameraZ: true
    },
    {
      imgSrc: './metro.svg',
      scale: [100, 100, 100]
    }
  );

  // load gas station data
  dataBillboard[1] = setText3DAndPawn(
    viewer,
    gasStationData,
    {
      textContent: 'GasStation',
      scale: [300, 30, 300],
      color: [1, 0.3, 0.2],
      faceCameraZ: true
    },
    {
      imgSrc: './gas.svg',
      scale: [100, 100, 100]
    }
  );

  //  load busstop data
  dataBillboard[2] = setText3DAndPawn(
    viewer,
    busStopData,
    {
      textContent: 'BusStop',
      scale: [300, 30, 300],
      color: [1, 0.3, 0.2],
      faceCameraZ: true
    },
    {
      imgSrc: './bus.svg',
      scale: [100, 100, 100]
    }
  );

  Modelo.Comment.get(modelId).then(res => {
    Modelo.Comment.activate(res[res.length - 1].id);
  });
});