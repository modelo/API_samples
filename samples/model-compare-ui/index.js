const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

// Initialize the API and specify the backend service URL
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

// Compare two models by modelIds
var viewer = new Modelo.UI.ModelCompareViewer({
  containerId: "modelContainer",
  baseModelId: "3rjZVNr4",
  updatedModelId: "a8bbbn85",
  onReady: viewer => {
    console.log("viewer ready", viewer);
  },
  onError: err => {
    console.log(err);
  }
});
