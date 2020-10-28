var Width = document.getElementById("Width");
var Length = document.getElementById("Length");
var Hight = document.getElementById("Hight");
var modelId = "Z83oJK8R";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });


Modelo.Model.getBBox(modelId)
.then(data => {
  var ModelData = [data[3]-data[0],data[4]-data[1],data[5]-data[2]];
  Width.value = ModelData[0]+"m";
  Length.value=ModelData[1]+"m";
  Hight.value =ModelData[2]+"m";
  //console.log(data);
})

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile()
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
      keyboard.addKeyUpListener(keyboard => {
        if (keyboard.key === 27) {
          viewer.destroy();
        }
      });   
    });  