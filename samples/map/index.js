let map;

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile(),
  useWebGL2: true,
});
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
// add keyboard callback.
// var keyboard = new Modelo.View.Input.Keyboard(viewer);
// viewer.addInput(keyboard);
// keyboard.addKeyUpListener((keyboard) => {
//   if (keyboard.keyCode === 27) {
//     viewer.getScene().removeMap(map);
//     map = undefined;
//   }
// });
// viewer.setEffectEnabled("SSAO", true);
// viewer.setShadowEnabled(true);
// viewer.setLightingLongitude((121 / 180) * Math.PI);
// viewer.setLightingLatitude((31 / 180) * Math.PI);

function addMap(type) {
  const longitude = parseFloat(document.getElementById("longitude").value);
  const latitude = parseFloat(document.getElementById("latitude").value);
  const level = parseInt(document.getElementById("level").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const maximumTilesNumber = parseInt(document.getElementById("maximumTilesNumber").value);
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
      console.log("地图绘制完成");
      document.getElementById("progress").innerHTML = "Map Loaded";
    })
    .catch((e) => {
      document.getElementById("progress").innerHTML = e;
    });
}

document.getElementById("loadmap").onclick = function () {
  if (map) {
    viewer.getScene().removeMap(map);
    map = undefined;
  }
  addMap(document.getElementById("maps").value);
};

document.getElementById("maps");

var buildings = new Modelo.View.Pawn("buildings", viewer.getResourceManager(), viewer.getMaterialManager());

// Load local gltf file with animation info. Note: Modelo3d only support gltf 2.0 version for now.
buildings.loadGltfModel("models/lujiazui.gltf").then(function () {
  // buildings.setScaling(1, 1, 1);
  // buildings.setTranslation(0, 0, 0);
  viewer.getScene().addPawn(buildings);
});
