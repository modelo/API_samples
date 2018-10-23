Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        var c = document.getElementById("model");

        var w = c.clientWidth;
        var h = c.clientHeight;
        var viewer = new Modelo.View.Viewer3D(c, false, w, h);

        window.addEventListener("resize",function() {
            var c = document.getElementById("model");
            var w = c.clientWidth;
            var h = c.clientHeight;
            viewer.resize(w, h);
        });
                
        viewer.addInput(new Modelo.View.Input.Mouse(c)); // Add mouse to control camera.

        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);
   
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");

                // Save the selected element names here.
                var elementNames = [];
                viewer.getEventEmitter().on("onElementSelected", (elementNames1) => {
                    // Restore the element's colors.
                    if (elementNames.length !== 0) {
                        viewer.getScene().setElementsColor(elementNames, null);
                    }

                    elementNames = elementNames1;
                    if (elementNames1.length === 0) {
                        document.getElementById('element').innerHTML = 'Select element with left button: N/A';
                    } else {
                        document.getElementById('element').innerHTML = 'Select element with left button: ' + elementNames1[0];
                    }
                });

                document.getElementById("default").onclick = function() {
                    viewer.getScene().setElementsColor(elementNames, null);
                };
                document.getElementById("red").onclick = function() {
                    viewer.getScene().setElementsColor(elementNames, [1, 0, 0]);
                };
                document.getElementById("green").onclick = function() {
                    viewer.getScene().setElementsColor(elementNames, [0, 1, 0]);
                };
                document.getElementById("blue").onclick = function() {
                    viewer.getScene().setElementsColor(elementNames, [0, 0, 1]);
                };
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


