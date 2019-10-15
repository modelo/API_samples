const modelId = "j1mXXDrb";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });
const viewer = new Modelo.View.Viewer3D("model");
viewer.loadModel(modelId, progress => {
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

    viewer.setLazyRenderingEnabled(false);
    const ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
    ribbon.setEnabled(true);
    viewer.getScene().addVisualize(ribbon);
    ribbon.setParameter("width", 2);
    ribbon.setParameter("unitLenght", 1000);
    ribbon.setParameter("speed", 1);
    ribbon.setParameter("platteTexture", "./platte.png");

    document.getElementById('configButton').onclick = () => {
      const configValues = $('#configForm').serializeArray();
      if (configValues) {
        configValues.map(values => {
          if (values.value) {
            ribbon.setParameter(values.name, values.value);
          }
        });
      }
    }
    // load traffic data
    let pointsArray = [];
    for (const key in trafficData) {
      pointsArray.push(trafficData[key]);
    }
    pointsArray.forEach(function (points) {
      points.forEach(function (point) {
        point[0] = point[0] * 3.2808;
        point[1] = point[1] * 3.2808;
      });
      ribbon.addRibbon(points);
    });

    viewer.setSmartCullingEnabled(false);
    Modelo.Comment.get(modelId).then(res => {
      Modelo.Comment.activate(res[res.length - 1].id);
    })
  });