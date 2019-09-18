var destroyBtn = document.getElementById("destroyBtn");
let modelApp;

destroyBtn.addEventListener("click", function() {
  if (modelApp) {
    modelApp.destroy();
  }
});

var modelId = "q1xqqQYJ";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y"
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

modelApp = new Modelo.UI.ModelViewer({
  modelId,
  containerId: "modelContainer",
  useDefaultFavicon: true
});