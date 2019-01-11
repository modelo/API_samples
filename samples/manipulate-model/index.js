// Initialize the API and specify the backend service URL
Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

let modelInfo = null; // Store model information
const searchValue = document.getElementById("searchValue");
const searchBtn = document.getElementById("searchBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteValue = document.getElementById("deleteValue");
const inputModelId = document.getElementById("model-id");
const inputModelName = document.getElementById("model-name");
const modelNameWrapper = document.getElementById("modelNameWrapper");
let fileSuffix = "";

const appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

Modelo.Auth.signIn(appToken).then(() => {
    // Search model by modelId
    searchBtn.onclick = () => {
        let searchId = searchValue.value || searchValue.placeholder;
        searchBtn.className = "ui loading button";
        Modelo.Model.get(searchId).then((model) => {
            modelInfo = JSON.parse(JSON.stringify(model));
            if ((modelInfo.name.indexOf(".zip") > -1) ||
                (modelInfo.name.indexOf(".skp") > -1) ||
                (modelInfo.name.indexOf(".3dm") > -1) ||
                (modelInfo.name.indexOf(".fbx") > -1) ||
                (modelInfo.name.indexOf(".s3d") > -1) ||
                (modelInfo.name.indexOf(".nwc") > -1) ||
                (modelInfo.name.indexOf(".nwd") > -1) ||
                (modelInfo.name.indexOf(".rfa") > -1) ||
                (modelInfo.name.indexOf(".rvt") > -1)) {
                const strIndex = modelInfo.name.lastIndexOf(".");
                const newShowName = modelInfo.name.substr(0, strIndex);
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
            console.log('search succ');
        }).catch((e) => {
            console.log('queryModelErr: ' + e);
            modelNameWrapper.className = "field";
            inputModelId.value = "No Info";
            inputModelName.value = "No Info";
            searchBtn.className = "ui button";
        });
    }
    // Update model-name
    inputModelName.onblur = (e) => {
        if (inputModelName.value == "" && inputModelId.value !== "") {
            modelNameWrapper.className = "field error";
        } else if (!modelInfo && typeof (modelInfo) != "undefined" && modelInfo != 0) {
            return false;
        } else {
            const newModelName = e.target.value.concat(fileSuffix);
            Modelo.Model.update(modelInfo.id, newModelName).then(() => {
                inputModelName.value = newModelName.substr(0, newModelName.lastIndexOf("."));
                modelNameWrapper.className = "field";
            }).catch(e => console.log('updateErr: ' + e));
        }
    }
    // Delete model by modelId
    deleteBtn.onclick = () => {
        const deleteModelId = deleteValue.value;
        deleteBtn.className = "ui loading button red";
        Modelo.Model.remove(deleteModelId).then((modelId) => {
            deleteBtn.className = "ui button red";
            console.log('deleteId: ' + modelId);
            console.log('delete success');
        }).catch((e) => {
            console.log('deleteErr: ' + e)
            deleteBtn.className = "ui button red";
        });
    }
}).catch(e => console.log('signInErr: ' + e));

