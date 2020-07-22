var destroyBtn = document.getElementById("destroyBtn");
let modelApp;

destroyBtn.addEventListener("click", function() {
  if (modelApp) {
    modelApp.destroy();
  }
});

var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

modelApp = new Modelo.UI.ModelViewer({
  modelId,
  containerId: "modelContainer",
  useDefaultFavicon: true,
  onReady: (viewer)=> {
    viewer.getCamera().setSensitivity({"mouseZoom": 0.5});
  }
});
