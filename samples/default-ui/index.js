var destroyBtn = document.getElementById("destroyBtn");
let modelApp;

destroyBtn.addEventListener("click", function() {
  if (modelApp) {
    modelApp.destroy();
  }
});

var modelId = "G8z6zQ8j";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

modelApp = new Modelo.UI.ModelViewer({
  modelId,
  containerId: "modelContainer",
  useDefaultFavicon: true
});