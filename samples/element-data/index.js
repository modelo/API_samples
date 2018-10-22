window.onload = function () {
   Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

    var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
    var modelId = "";  // Check out the model ID in the project page.
    // ElementId can be found from BIMTree
    // sample elementId: 954779
    Modelo.Auth.signIn(
        appToken,
        function () {
            var searchModelId = document.getElementById("searchModelId");
            var searchElementId = document.getElementById("searchElementId");
            var searchBtn = document.getElementById("searchBtn");
            var propertyKey = document.getElementById("property-key");
            var propertyGroup = document.getElementById("property-group");
            var propertyGroupKey = document.getElementById("property-group-key");
            var PropertyValueShow = document.getElementById("PropertyValueShow");
            var propertyValue = document.getElementById("property-value");
            var propertyUnit = document.getElementById("property-unit");
            var updateBtn = document.getElementById("updateBtn");
            var types = Boolean;
            searchBtn.onclick = function () {
                var searchModelIdValue = searchModelId.value;
                var searchElementIdValue = searchElementId.value;
                searchBtn.className = "ui loading button";
                PropertyValueShow.className = "field";
                console.log(searchModelIdValue);
                console.log(searchElementIdValue);
                // Query the bim data of element
                Modelo.BIM.queryElementBIM(
                    searchModelIdValue,
                    searchElementIdValue,
                    function (properties) {
                        // Get BIMProperties.
                        console.log(properties);
                        // The first element data value is displayed by default
                        var elementData = JSON.parse(JSON.stringify(properties));
                        var numValue = elementData[0].numValue;
                        var strValue = elementData[0].strValue;
                        var unit = elementData[0].unit;
                        propertyKey.value = elementData[0].key;
                        propertyGroup.value = elementData[0].group;
                        propertyGroupKey.value = elementData[0].groupKey;
                        if (unit === null) {
                            propertyUnit.value = "No Info";
                        } else {
                            propertyUnit.value = unit;
                        }
                        // User can modify property value
                        if (numValue === null && !(strValue === null)) {
                            types = false;
                            propertyValue.value = strValue;
                            propertyValue.removeAttribute("readonly");
                        } else {
                            types = true;
                            console.log(typeof (numValue));
                            propertyValue.value = numValue;
                            propertyValue.removeAttribute("readonly");
                        }
                        searchBtn.className = "ui button";
                        console.log(typeof (propertyValue.value));
                        // Update the element property value with elementId, modelId and property
                        updateBtn.onclick = function () {
                            updateBtn.className = "ui primary loading button";
                            console.log(searchModelIdValue);
                            if (propertyValue.value == "") {
                                PropertyValueShow.className = "field error";
                                updateBtn.className = "ui primary button";
                                return false;
                            } else {
                                console.log("Ok ");
                                console.log(propertyValue.value);
                                var newPropertyUnit = null;
                                if (propertyUnit.value == "No Info") {
                                    newPropertyUnit = null;
                                } else {
                                    newPropertyUnit = propertyUnit.value;
                                }
                                if (types) {
                                    Modelo.BIM.updateElementBIM(
                                        searchModelIdValue,
                                        searchElementIdValue,
                                        {
                                            key: propertyKey.value,
                                            group: propertyGroup.value,
                                            groupKey: propertyGroupKey.value,
                                            strValue: null,
                                            numValue: Number(propertyValue.value),
                                            unit: propertyUnit.value
                                        },
                                        function () {
                                            propertyValue.value = propertyValue.value;
                                            updateBtn.className = "ui primary button";
                                            console.log(propertyValue.value);
                                            console.log("updateSucc");
                                        },
                                        function (errMsg) {
                                            updateBtn.className = "ui primary button";
                                            console.log("updateElementBIM" + errMsg);
                                        }
                                    );
                                } else {
                                    Modelo.BIM.updateElementBIM(
                                        searchModelIdValue,
                                        searchElementIdValue,
                                        {
                                            key: propertyKey.value,
                                            group: propertyGroup.value,
                                            groupKey: propertyGroupKey.value,
                                            strValue: propertyValue.value,
                                            numValue: null,
                                            unit: propertyUnit.value
                                        },
                                        function () {
                                            propertyValue.value = propertyValue.value;
                                            updateBtn.className = "ui primary button";
                                            console.log("updateSucc");
                                        },
                                        function (errMsg) {
                                            updateBtn.className = "ui primary button";
                                            console.log("updateElementBIM" + errMsg);
                                        }
                                    );
                                }
                            }
                        }
                    },
                    function (errMsg) {
                        propertyKey.value = "No Info";
                        propertyGroup.value = "No Info";
                        propertyGroupKey.value = "No Info";
                        propertyUnit.value = "No Info";
                        propertyValue.value = "No Info";
                        propertyValue.setAttribute("readonly", "");
                        searchBtn.className = "ui button";
                        console.log('queryElementBIMErr: ' + errMsg);
                    },
                );
            }
        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        }
    );
}
