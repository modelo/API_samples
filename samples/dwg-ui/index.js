var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1NTIwMTIyMTksImV4cCI6MzMwODgwMTIyMTl9.Fb-AKOuaWYxwIMmyu3T6GENkUrbP8J21MffB78IpXU0"; // A sample app token
// Initialize the API and specify the backend service URL
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var assetId = 479;
var app = new Modelo.UI.DWGViewer({
  locale: "zh",
  containerId: "dwgContainer",
  assetId,
  onReady: viewer => {
    console.log("viewer ready", viewer);
  },
  onError: err => {
    console.log(err);
  }
});
