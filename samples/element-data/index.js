var searchModelId = document.getElementById("searchModelId");
var searchElementId = document.getElementById("searchElementId");
var searchBtn = document.getElementById("searchBtn");
var propertyName = document.getElementById("property-name");
var propertyGroup = document.getElementById("property-group");
var propertyGroupKey = document.getElementById("property-group-key");
var PropertyValueShow = document.getElementById("PropertyValueShow");
var propertyValue = document.getElementById("property-value");
var propertyUnit = document.getElementById("property-unit");
var updateBtn = document.getElementById("updateBtn");
let types = Boolean;

var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

searchBtn.onclick = () => {
  let searchModelIdValue = searchModelId.value || searchModelId.placeholder;
  let searchElementIdValue = searchElementId.value || searchElementId.placeholder;
  searchBtn.className = "ui loading button";
  PropertyValueShow.className = "field";
  // Query the bim data of element
  Modelo.BIM.getElementProperties(searchModelIdValue, searchElementIdValue)
    .then(properties => {
      // Get BIMProperties.
      // The first element data value is displayed by default
      var elementData = JSON.parse(JSON.stringify(properties));
      var numValue = elementData[0].numValue;
      var strValue = elementData[0].strValue;
      var unit = elementData[0].unit;
      propertyName.value = elementData[0].name;
      propertyGroup.value = elementData[0].group;
      propertyGroupKey.value = elementData[0].groupKey;
      if (unit === null) {
        propertyUnit.value = "No Info";
      } else {
        propertyUnit.value = unit;
      }
      // User can modify property value
      if (numValue === null && strValue !== null) {
        types = false;
        propertyValue.value = strValue;
        propertyValue.removeAttribute("readonly");
      } else {
        types = true;
        propertyValue.value = numValue;
        propertyValue.removeAttribute("readonly");
      }
      searchBtn.className = "ui button";
      // Update the element property value with elementId, modelId and property
      updateBtn.onclick = function() {
        updateBtn.className = "ui primary loading button";
        if (propertyValue.value == "") {
          PropertyValueShow.className = "field error";
          updateBtn.className = "ui primary button";
          return false;
        } else {
          if (types) {
            Modelo.BIM.updateElementProperty(searchModelIdValue, searchElementIdValue, {
              name: propertyName.value,
              groupKey: propertyGroupKey.value,
              numValue: isNaN(Number(propertyValue.value)) ? null : Number(propertyValue.value)
            })
              .then(() => {
                propertyValue.value = propertyValue.value;
                updateBtn.className = "ui primary button";
                console.log("updateSucc");
              })
              .catch(e => {
                propertyValue.value = 0;
                updateBtn.className = "ui primary button";
                console.log("updateElementBIM" + e);
              });
          } else {
            Modelo.BIM.updateElementProperty(searchModelIdValue, searchElementIdValue, {
              name: propertyName.value,
              groupKey: propertyGroupKey.value,
              strValue: propertyValue.value
            })
              .then(() => {
                propertyValue.value = propertyValue.value;
                updateBtn.className = "ui primary button";
                console.log("updateSucc");
              })
              .catch(e => {
                updateBtn.className = "ui primary button";
                console.log("updateElementBIM" + e);
              });
          }
        }
      };
    })
    .catch(e => {
      propertyName.value = "No Info";
      propertyGroup.value = "No Info";
      propertyGroupKey.value = "No Info";
      propertyUnit.value = "No Info";
      propertyValue.value = "No Info";
      propertyValue.setAttribute("readonly", "");
      searchBtn.className = "ui button";
      console.log("queryElementBIMErr: " + e);
    });
};
