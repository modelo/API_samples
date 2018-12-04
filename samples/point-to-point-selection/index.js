Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "G2YDEW85";
var appToken = 'VHlsaW4sbW9kZWxvQkk1NjA='; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        var viewer = new Modelo.View.Viewer3D("model");
     
        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);
        selectElementTool.setMultiselectEnabled(true);
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");

                var highlightColor = [0.6, 0.5, 0.0, 1.0];
                var oldElementNames;
                var searched = false;
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
                    } else if (elementNames.length == 2) {
                        var pathes = selectElementTool.findElementsInBetween(elementNames[0], elementNames[1]);
                        if (pathes.length > 0) {
                            selectElementTool.pick(pathes);
                            viewer.getScene().core.setElementsColor(pathes, highlightColor);
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
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            })
    },
    function (err) {
        console.log(err);
    });


