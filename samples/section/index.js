Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
Modelo.Auth.signIn(appToken, 
    function () {
        var viewer = new Modelo.View.Viewer3D("model");

        viewer.setSmartCullingEnabled(false);
        
        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("done");

                // Notice that we should always add the section tool after the model is done loading.
                // Otherwise, it will cause some unexpected errors
                var section = new Modelo.View.Tool.Section(viewer)
                viewer.addTool(section);

                document.getElementById("section").onchange = function(evt) {
                    var checked = document.getElementById("section").checked;
                    console.log(checked);
                    section.setEnabled(checked);
                    document.getElementById("interaction").checked = checked;
                    section.setInteractive(checked);
                    viewer.invalidate();
                };

                document.getElementById("interaction").onchange = function(evt) {
                    section.setInteractive(document.getElementById("interaction").checked);
                    viewer.invalidate();
                };
                document.getElementById("rotation").onchange = function(evt) {
                    section.setRotatable(document.getElementById("rotation").checked);
                    viewer.invalidate();
                };
                document.getElementById("resetSectionBox").addEventListener("click", function() {
                    section.reset();
                    viewer.invalidate();
                });
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });
    },
    function (err) {
        console.log(err)
    });

