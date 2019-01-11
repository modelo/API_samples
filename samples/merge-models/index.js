
// Initialize the API and specify the backend service URL
Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

let modelIdList = [];
const addNameInput = document.getElementById("addNameInput");
const addNameBtn = document.getElementById("addNameBtn");
const addIdInput = document.getElementById("addIdInput");
const addIdBtn = document.getElementById("addIdBtn");
const listInfoTitle = document.getElementById("listInfoTitle");
const infoList = document.getElementById("infoList");
const mergeBtn = document.getElementById("mergeBtn");
const mergeInfoTip = document.getElementById("mergeInfoTip");
const mergedModelId = document.getElementById("merged-model-id");
const mergedModelNameInput = document.getElementById("merged-model-name");

const appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

Modelo.Auth.signIn(appToken).then(() => {
    addNameBtn.onclick = () => {
        if (addNameInput.value == "") {
            console.log("please input name");
            return 0;
        } else {
            const inputName = addNameInput.value.trim();
            listInfoTitle.innerHTML = "Model to be merged named: " + inputName;
            addNameInput.value = "";
        }
    }
    addIdBtn.onclick = () => {
        if (addIdInput.value == "") {
            console.log("please input id");
            return 0;
        } else {
            const inputInfo = addIdInput.value.trim();
            const li = document.createElement("li");
            li.innerHTML = inputInfo;
            infoList.appendChild(li);
            addIdInput.value = "";
        }
    }
    mergeBtn.onclick = () => {
        mergeBtn.className = "ui blue loading button";
        mergeInfoTip.style.display = "none";
        const startIndex = listInfoTitle.innerHTML.indexOf(":");
        const mergedModelName = listInfoTitle.innerHTML.slice(startIndex + 2);
        for (let i = 0; i < infoList.childNodes.length; i++) {
            modelIdList.push(infoList.childNodes[i].innerHTML);
        }
        console.log(mergedModelName);
        console.log(modelIdList);
        Modelo.Model.merge(mergedModelName, modelIdList).then((modelId) => {
            console.log("Merged-model Id: " + modelId);
            listInfoTitle.innerHTML = "Model to be merged named: ";
            while (infoList.firstChild) {
                infoList.removeChild(infoList.firstChild);
            };
            modelIdList = [];
            mergeInfoTip.style.display = "none";
            mergeBtn.className = "ui blue button";
            mergedModelId.value = modelId;
            mergedModelNameInput.value = mergedModelName;
        }).catch((e) => {
            console.log('merge fail: ' + e);
            listInfoTitle.innerHTML = "Model to be merged named: ";
            while (infoList.firstChild) {
                infoList.removeChild(infoList.firstChild);
            };
            modelIdList = [];
            mergeInfoTip.style.display = "inline-block";
            mergeBtn.className = "ui blue button";
            mergedModelId.value = "No Info";
            mergedModelNameInput.value = "No Info";
        });
    }
}).catch(e => console.log('signInErr: ' + e));

