var modelId = "gYEODnr5";
var appToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y'; // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

viewer.loadModel(modelId)
    .then(function () { // success
        console.log("loading done");

        var highlightColor = [0.6, 0.5, 0.0, 1.0];
        var oldElementNames;
        var searched = false;

        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);
        selectElementTool.setMultiselectEnabled(true);


        viewer.getEventEmitter().on("onElementSelected", (elementNames) => {
            if (searched) {
                selectElementTool.pick(null);
                viewer.getScene().core.restoreElementsColor(oldElementNames);
                viewer.invalidate();
                searched = false;
                return;
            }
            if (elementNames.length == 1) {
                selectElementTool.pick(elementNames);
                console.log(elementNames);
            } else if (elementNames.length == 2) {
                var pathes = selectElementTool.findElementsInBetween(elementNames[0], elementNames[1]);
                if (pathes.length > 0) {
                    selectElementTool.pick(pathes);
                    // viewer.getScene().core.setElementsColor(pathes, highlightColor);
                    viewer.invalidate();
                    oldElementNames = pathes;
                    searched = true;
                } else {
                    alert("not connected");
                    selectElementTool.pick(null);
                    searched = false;
                }
            }
        });
    });
