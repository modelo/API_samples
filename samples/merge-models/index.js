let modelIdList = [];
var addNameInput = document.getElementById("addNameInput");
var addNameBtn = document.getElementById("addNameBtn");
var addIdInput = document.getElementById("addIdInput");
var addIdBtn = document.getElementById("addIdBtn");
var listInfoTitle = document.getElementById("listInfoTitle");
var infoList = document.getElementById("infoList");
var mergeBtn = document.getElementById("mergeBtn");
var mergeInfoTip = document.getElementById("mergeInfoTip");
var mergedModelId = document.getElementById("merged-model-id");
var mergedModelNameInput = document.getElementById("merged-model-name");

var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

addNameBtn.onclick = () => {
  if (addNameInput.value == "") {
    console.log("please input name");
    return 0;
  } else {
    var inputName = addNameInput.value.trim();
    listInfoTitle.innerHTML = "Model to be merged named: " + inputName;
    addNameInput.value = "";
  }
};
addIdBtn.onclick = () => {
  if (addIdInput.value == "") {
    console.log("please input id");
    return 0;
  } else {
    var inputInfo = addIdInput.value.trim();
    var li = document.createElement("li");
    li.innerHTML = inputInfo;
    infoList.appendChild(li);
    addIdInput.value = "";
  }
};
mergeBtn.onclick = () => {
  mergeBtn.className = "ui blue loading button";
  mergeInfoTip.style.display = "none";
  var startIndex = listInfoTitle.innerHTML.indexOf(":");
  var mergedModelName = listInfoTitle.innerHTML.slice(startIndex + 2);
  for (let i = 0; i < infoList.childNodes.length; i++) {
    modelIdList.push(infoList.childNodes[i].innerHTML);
  }
  console.log(mergedModelName);
  console.log(modelIdList);
  Modelo.Model.merge(mergedModelName, modelIdList)
    .then(modelId => {
      console.log("Merged-model Id: " + modelId);
      listInfoTitle.innerHTML = "Model to be merged named: ";
      while (infoList.firstChild) {
        infoList.removeChild(infoList.firstChild);
      }
      modelIdList = [];
      mergeInfoTip.style.display = "none";
      mergeBtn.className = "ui blue button";
      mergedModelId.value = modelId;
      mergedModelNameInput.value = mergedModelName;
    })
    .catch(e => {
      console.log("merge fail: " + e);
      listInfoTitle.innerHTML = "Model to be merged named: ";
      while (infoList.firstChild) {
        infoList.removeChild(infoList.firstChild);
      }
      modelIdList = [];
      mergeInfoTip.style.display = "inline-block";
      mergeBtn.className = "ui blue button";
      mergedModelId.value = "No Info";
      mergedModelNameInput.value = "No Info";
    });
};
