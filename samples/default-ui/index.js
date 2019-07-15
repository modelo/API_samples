let modelApp;

var modelId = "x1qXwRrW";
var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

modelApp = new Modelo.UI.ModelViewer({
  modelId,
  containerId: "modelContainer",
  useDefaultFavicon: true,
  colors: {
    selected: "#ff0000",
    connected: "#00ff00",
    unconnected: "#0000ff"
  },
  // set the default unit in measure tools
  // length unit could be one of ['m', 'cm', 'feet', 'inches']
  // angle unit could be one of ['degree', 'radian']
  lengthUnit: 'm',
  angleUnit: 'radian',
  hooks: {
    getBIMInsightDropdownOptions: (options, props) => {
      // use this callback function to decide which properties should be available in BIM info's Chart
      // the first parameter passed in will be current options
      // the second parameter will be current properties
      // users can turn a property object into an option object if this property should be available to use
      // an option object should contain three properties: groupKey, propName and label
      // groupKey and propName can be found in property object
      // label will be used as the text in the dropdown list
      return [...options, { groupKey: 1, propName: "length", label: "length" }];
    },
    getBIMPropertyGroups: groups => {
      // use this callback function to control which properties shoule be visible in BIM property panel
      // the parameter passed in will be all the property groups
      // the return value should be an array with group objects
      // a property group contains group name, group key and property items belong to it
      // the example below will hide all the properties which name has less than 3 characters
      return groups.map(group => ({
        ...group,
        properties: group.properties.filter(prop => prop.name.length > 3)
      }));
    }
  }
});

let showBimComments = true;
document.getElementById("toggle-module").addEventListener("click", function() {
  showBimComments = !showBimComments;
  modelApp.setModules({ BIMComments: showBimComments });
});

document.getElementById("set-zoom-speed").addEventListener("click", function() {
  modelApp.viewer.getCamera().setMouseZoomSpeed(10);
});

document.getElementById("reset-camera").addEventListener("click", function() {
  modelApp.viewer.getCamera().switchToWorldView();
});

document.getElementById("get-uuid").addEventListener("click", function() {
  let guid = modelApp.viewer
    .getScene()
    .getElementNameByGuid("004a982c-c8c9-45a7-8284-f3ef025d4e56");
  console.log(guid);
});

document.getElementById("get-uuids").addEventListener("click", function() {
  let guids = modelApp.viewer
    .getScene()
    .getElementsNamesByGuids([
      "004a982c-c8c9-45a7-8284-f3ef025d4e56",
      "004a982c-c8c9-45a7-8284-f3ef025d4fb4",
      "5c40df88-3a23-439b-b20e-553cf279c4a1",
      "5c40df88-3a23-439b-b20e-553cf279c4a7",
      "5c40df88-3a23-439b-b20e-553cf279c4ac",
      "5c40df88-3a23-439b-b20e-553cf279c4af",
      "5c40df88-3a23-439b-b20e-553cf279c4b6"
    ]);
  console.log(guids);
});
