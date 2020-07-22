let modelInfo = null; // Store model information
var searchValue = document.getElementById("searchValue");
var searchBtn = document.getElementById("searchBtn");
var inputModelId = document.getElementById("model-id");
var inputModelName = document.getElementById("model-name");
var modelNameWrapper = document.getElementById("modelNameWrapper");
let fileSuffix = "";

var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
// Initialize the API and specify the backend service URL
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

// Search model by modelId
searchBtn.onclick = () => {
  let searchId = searchValue.value || searchValue.placeholder;
  searchBtn.className = "ui loading button";
  Modelo.Model.get(searchId)
    .then(model => {
      modelInfo = JSON.parse(JSON.stringify(model));
      if (
        modelInfo.name.indexOf(".zip") > -1 ||
        modelInfo.name.indexOf(".skp") > -1 ||
        modelInfo.name.indexOf(".3dm") > -1 ||
        modelInfo.name.indexOf(".fbx") > -1 ||
        modelInfo.name.indexOf(".s3d") > -1 ||
        modelInfo.name.indexOf(".nwc") > -1 ||
        modelInfo.name.indexOf(".nwd") > -1 ||
        modelInfo.name.indexOf(".rfa") > -1 ||
        modelInfo.name.indexOf(".rvt") > -1
      ) {
        var strIndex = modelInfo.name.lastIndexOf(".");
        var newShowName = modelInfo.name.substr(0, strIndex);
        fileSuffix = modelInfo.name.substr(strIndex);
        inputModelId.value = modelInfo.id;
        inputModelName.value = newShowName;
      } else {
        inputModelId.value = modelInfo.id;
        inputModelName.value = modelInfo.name;
      }
      searchBtn.className = "ui button";
      modelNameWrapper.className = "field";
      inputModelName.removeAttribute("readonly");
      console.log("search succ");
    })
    .catch(e => {
      console.log("queryModelErr: " + e);
      modelNameWrapper.className = "field";
      inputModelId.value = "No Info";
      inputModelName.value = "No Info";
      searchBtn.className = "ui button";
    });
};
// Update model-name
inputModelName.onblur = e => {
  if (inputModelName.value == "" && inputModelId.value !== "") {
    modelNameWrapper.className = "field error";
  } else if (!modelInfo && typeof modelInfo != "undefined" && modelInfo != 0) {
    return false;
  } else {
    var newModelName = e.target.value.concat(fileSuffix);
    Modelo.Model.update(modelInfo.id, newModelName)
      .then(() => {
        inputModelName.value = newModelName.substr(0, newModelName.lastIndexOf("."));
        modelNameWrapper.className = "field";
      })
      .catch(e => console.log("updateErr: " + e));
  }
};
