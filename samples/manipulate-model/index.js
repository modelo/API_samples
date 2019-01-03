window.onload = function () {
    // Initialize the API and specify the backend service URL
    // https://bim-portal-dev.modeloapp.com || https://build-portal.modeloapp.com
    // devAPI
    Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

    var modelId = "";
    var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

    Modelo.Auth.signIn(
        appToken,
        function () {
            var modelInfo = null; // Store model information
            var searchValue = document.getElementById("searchValue");
            var searchBtn = document.getElementById("searchBtn");
            var deleteBtn = document.getElementById("deleteBtn");
            var deleteValue = document.getElementById("deleteValue");
            var inputModelId = document.getElementById("model-id");
            var inputModelName = document.getElementById("model-name");
            var modelNameWrapper = document.getElementById("modelNameWrapper");
            var fileSuffix = "";
            // Search model by modelId
            searchBtn.onclick = function () {
                var searchId = searchValue.value || searchValue.placeholder;
                searchBtn.className = "ui loading button";
                Modelo.Model.get(
                    searchId,
                    function (model) {
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
                    },
                    function (errMsg) {
                        console.log('queryModelErr: ' + errMsg);
                        modelNameWrapper.className = "field";
                        inputModelId.value = "No Info";
                        inputModelName.value = "No Info";
                        searchBtn.className = "ui button";
                    },
                );
            }
            // Update model-name 
            inputModelName.onblur = function (e) {
                if (inputModelName.value == "" && inputModelId.value !== "") {
                    modelNameWrapper.className = "field error";
                } else if (!modelInfo && typeof (modelInfo) != "undefined" && modelInfo != 0) {
                    return false;
                } else {
                    var newModelName = e.target.value.concat(fileSuffix);
                    Modelo.Model.update(
                        modelInfo.id,
                        newModelName,
                        function (modelId) {
                            console.log(modelId);
                            inputModelName.value = newModelName.substr(0, newModelName.lastIndexOf("."));
                            modelNameWrapper.className = "field";
                        },
                        function (errMsg) {
                            console.log('updateErr: ' + errMsg)
                        },
                    );
                }
            };
            // Delete model by modelId
            deleteBtn.onclick = function () {
                var deleteModelId = deleteValue.value;
                deleteBtn.className = "ui loading button red";
                Modelo.Model.remove(
                    deleteModelId,
                    function (modelId) {
                        deleteBtn.className = "ui button red";
                        console.log('deleteId: ' + modelId);
                        console.log('delete success');
                    },
                    function (errMsg) {
                        console.log('deleteErr: ' + errMsg)
                        deleteBtn.className = "ui button red";
                    },
                );
            };
        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        }
    );
}
