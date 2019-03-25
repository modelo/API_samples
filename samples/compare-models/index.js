var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1NTIwMTIyMTksImV4cCI6MzMwODgwMTIyMTl9.Fb-AKOuaWYxwIMmyu3T6GENkUrbP8J21MffB78IpXU0"; // A sample app token
// Initialize the API and specify the backend service URL
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

// Compare two models by modelIds
var viewer = new Modelo.UI.ModelCompareViewer({
  containerId: "modelContainer",
  baseModelId: "3rjAQv84",
  updatedModelId: "78RevjYX",
  onReady: viewer => {
    console.log("viewer ready", viewer);
  },
  onError: err => {
    console.log(err);
  }
});
