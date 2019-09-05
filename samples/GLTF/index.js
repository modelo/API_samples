var modelId = "G8z6zQ8j";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

viewer.loadGLTFModel("http://localhost:8080/samples/GLTF/Avocado/Avocado.gltf");
viewer.addInput(new Modelo.View.Input.Mouse(viewer));


var cubemapImages = [
  document.getElementById("negx"),
  document.getElementById("negy"),
  document.getElementById("negz"),
  document.getElementById("posx"),
  document.getElementById("posy"),
  document.getElementById("posz")
];

var { ViewBackground } = Modelo.View;
viewer.setBackgroundMode(ViewBackground.CUBEMAP);
viewer.setBackgroundImage(cubemapImages);