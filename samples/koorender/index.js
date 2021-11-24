var modelId = "m8vM2eYL";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMxLCJ1c2VybmFtZSI6ImxtIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTYzNDYxMjQ2NSwiZXhwIjozMzE3MDYxMjQ2NX0.Q8IHwhg90aatmTeZChUthyhyt4KVAgKgf7LFMTgL0Ao"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
});

function download(url){
  let aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = "screenShot.png";
  aLink.click();
}


viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    // model loaded successfully
    // add mouse to control camera.
    viewer.setShadowEnabled(true);
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);

    var EngineManager = new Modelo.EngineManager(viewer);
    let image1 =  document.getElementById("image1t");


    EngineManager.setBackgroundImage(image1);

    var options = {
      startKoorender:()=>{
        EngineManager.switchEngine();
        let isRealSkyEnabled = EngineManager.isRealSkyEnabled();
        if(isRealSkyEnabled){
          realSkyConfig.open();
          skyBoxConfig.close();
        }else{
          // 设置背景图
          EngineManager.setBackgroundImage(image1);
          realSkyConfig.close();
          skyBoxConfig.open();
        }
      },
      shotScreen:()=>{
        EngineManager.shotScreen().then((image)=>{
          download(image);
        });
      },
      LightTheta:0,
      LightPhi:Math.PI/2,
      LightIntensity:33,
      BackgroundIntensity:1,
      cameraFov:46,
      IBLIntensity:1,
      StandardEV:1,
      skyMode:"实时天空",
      autoExposure:true,
      enabledReflect:false,
      Reflection:0
    }
    var control = new dat.GUI();
    var base = control.addFolder('基础功能');
    base.add(options, 'startKoorender');
    base.add(options,'cameraFov',1, 100).step(1).onChange((value)=>{
      viewer.setFov(value);
    })

    base.add(options, "skyMode",["实时天空", "天空盒"]).onChange((value)=>{
      EngineManager.enabledRealSky(value==="实时天空");
      let isRealSkyEnabled = EngineManager.isRealSkyEnabled();
      if(isRealSkyEnabled){
        realSkyConfig.open();
        skyBoxConfig.close();
      }else{
        realSkyConfig.close();
        skyBoxConfig.open();
      }
    });
    base.add(options, 'autoExposure').onChange((value)=>{
      EngineManager.enabledAutoExposure(value);
    });
    base.open();

    var api = control.addFolder('Api');
    api.add(options,'shotScreen');
    api.open();


    // 背景图类型
    // 切换背景图
    var environment = control.addFolder('环境配置');
    environment.open();

    // 这里的theta,phi分别用于描述方位角，俯仰角
    environment.add(options, 'LightTheta', 0, 2 * Math.PI).step(0.01).onChange((value) => {
      EngineManager.setSunLightTheta(value);
    });
    environment.add(options, 'LightPhi', 0, Math.PI).step(0.01).onChange((value) => {
      EngineManager.setSunLightPhi(value);
    });
    environment.add(options, 'LightIntensity', 0, 50).step(1).onChange((value) => {
      EngineManager.setSunLightIntensity(value);
    });
    environment.add(options, 'BackgroundIntensity', 0, 2).step(0.01).onChange((value) => {
      EngineManager.setBackgroundIntensity(value);
    });
    environment.add(options, 'IBLIntensity', 0, 10).step(0.01).onChange((value) => {
      EngineManager.setIBLIntensity(value);
    });
    environment.add(options, 'StandardEV', 0, 4).step(0.01).onChange((value) => {
      EngineManager.setStandardEV(value);
    });

    environment.add(options, 'enabledReflect').onChange((value) => {
      EngineManager.enabledReflect(value);
    });
    environment.add(options, 'Reflection', 0, 1).step(0.01).onChange((value) => {
      EngineManager.updateReflection(value);
    });





    // 实时天空的控件
    var realSkyoptions = {
      windSpeed:0.1,
      windDirection:0,
      cloudAmount:0.5,
      cirrusAmount:0.5,
    }
    var realSkyConfig = control.addFolder('实时天空');
    realSkyConfig.add(realSkyoptions, 'windSpeed',  0, 30, 0.5).onChange((value) => {
      EngineManager.setWindSpeed(value);
    });
    realSkyConfig.add(realSkyoptions, 'windDirection', 0, 6.28, 0.01).onChange((value) => {
      EngineManager.setWindDirection(value);
    });
    realSkyConfig.add(realSkyoptions, 'cloudAmount',  0, 1, 0.01).onChange((value) => {
      EngineManager.setCloudAmount(value);
    });
    realSkyConfig.add(realSkyoptions, 'cirrusAmount', 0, 1, 0.01).onChange((value) => {
      EngineManager.setCirrusAmount(value);
    });
    realSkyConfig.close();
    

    var skyBoxoptions = {
      backgroundMode:"背景模式"
    }
    var skyBoxConfig = control.addFolder('天空盒');
    skyBoxConfig.add(skyBoxoptions, 'backgroundMode',["穹顶","平铺"]).onChange((value)=>{
      EngineManager.setBackgroundImage(image1);
      if(value === "平铺"){
        EngineManager.setBackgroundMode(1);
      }
      if(value === "穹顶"){
        EngineManager.setBackgroundMode(2);
      }

    })
    skyBoxConfig.close();

  });
