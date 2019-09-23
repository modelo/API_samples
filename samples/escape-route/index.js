var modelId = "Vr4BBRYg";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const pointsArray = [
    [
      [
        72871.494146899742,
        -125467.92343027331,
        0.0
      ],
      [
        72871.494146899742,
        -123614.41521915198,
        0.0
      ],
      [
        74976.713349654834,
        -123614.41521915198,
        0.0
      ],
      [
        74976.713349654834,
        -121943.96954740067,
        0.0
      ],
      [
        85731.637537642775,
        -121943.96954740067,
        0.0
      ],
      [
        85731.637537642775,
        -117115.69507151673,
        0.0
      ],
      [
        83237.410438726423,
        -117115.69507151673,
        0.0
      ]
    ],
    [
      [
        59973.877586595438,
        -125630.54755817684,
        0.0
      ],
      [
        59973.877586595438,
        -122129.47649272544,
        0.0
      ],
      [
        51461.469505890091,
        -122129.47649272544,
        0.0
      ],
      [
        51461.469505890091,
        -117530.030191054,
        0.0
      ],
      [
        54665.063944865222,
        -117530.030191054,
        0.0
      ]
    ]
];
const viewer = new Modelo.View.Viewer3DDark("model");
viewer.setRenderingLinesEnabled(true);
viewer.loadModel(modelId, progress => {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });

    viewer.setSmartCullingEnabled(false);
  });

  viewer.setLazyRenderingEnabled(false);
  const ribbon = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  ribbon.setEnabled(true);
  viewer.getScene().addVisualize(ribbon);
  ribbon.setParameter("width", 2);
  ribbon.setParameter("unitLenght", 1000);
  ribbon.setParameter("speed", 1);
  ribbon.setParameter("platteTexture", "./platte.png");
  pointsArray.forEach(function(points) {
    ribbon.addRibbon(points);
  });
