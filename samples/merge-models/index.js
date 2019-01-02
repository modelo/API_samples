window.onload = function () {
    // Initialize the API and specify the backend service URL
    // https://bim-portal-dev.modeloapp.com || https://build-portal.modeloapp.com
    Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });
    var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

    Modelo.Auth.signIn(
        appToken,
        function () {
            var modelIdList = [];
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
            addNameBtn.onclick = function () {
                if (addNameInput.value == "") {
                    console.log("please input name");
                    return 0;
                } else {
                    var inputName = addNameInput.value.trim();
                    listInfoTitle.innerHTML = "Model to be merged named: " + inputName;
                    addNameInput.value = "";
                }
            }
            addIdBtn.onclick = function () {
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
            }
            mergeBtn.onclick = function () {
                mergeBtn.className = "ui blue loading button";
                mergeInfoTip.style.display = "none";
                var startIndex = listInfoTitle.innerHTML.indexOf(":");
                var mergedModelName = listInfoTitle.innerHTML.slice(startIndex + 2);
                for (var i = 0; i < infoList.childNodes.length; i++) {
                    modelIdList.push(infoList.childNodes[i].innerHTML);
                }
                console.log(mergedModelName);
                console.log(modelIdList);
                Modelo.Model.merge(
                    mergedModelName,
                    modelIdList,
                    function onSuccess(modelId) {
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

                    },
                    function onFail(errMsg) {
                        console.log('merge fail: ' + errMsg);
                        listInfoTitle.innerHTML = "Model to be merged named: ";
                        while (infoList.firstChild) {
                            infoList.removeChild(infoList.firstChild);
                        };
                        modelIdList = [];
                        mergeInfoTip.style.display = "inline-block";
                        mergeBtn.className = "ui blue button";
                        mergedModelId.value = "No Info";
                        mergedModelNameInput.value = "No Info";
                    }
                );
            }

        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        }
    );
}
