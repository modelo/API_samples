var modelWidth = document.getElementById("Width");
var modelLength = document.getElementById("Length");
var modelHeight = document.getElementById("Height");
var modelId = "Z83oJK8R";
var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"; // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile(),
});

viewer
  .loadModel(modelId)
  // second parameter is an optional progress callback
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener((keyboard) => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });

    getModelBBox();
  });

/**
 * 获取模型包围盒信息
 */
function getModelBBox() {
  Modelo.Model.getBBox(modelId).then((data) => {
    // 获取包围盒长宽高 ，并转换成 m (Modelo默认单位为 英尺)
    var modelData = [data[3] - data[0], data[4] - data[1], data[5] - data[2]].map((val) => val * 0.3048);
    modelWidth.value = modelData[0] + "m";
    modelLength.value = modelData[1] + "m";
    modelHeight.value = modelData[2] + "m";
  });
}
