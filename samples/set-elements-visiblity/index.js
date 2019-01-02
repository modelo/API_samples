Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        var viewer = new Modelo.View.Viewer3D("model");

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);

        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");

                var elements = [];
                var names = viewer.getScene().getElementsNames();
                // Pick 7 random elements
                for (var i = 0; i < 7; i++) {
                    var c = Math.round(Math.random() * 10000) % names.length;
                    elements.push(names[c]);
                    document.getElementById("l" + (i + 1)).innerHTML = names[c];
                }

                document.getElementById("e1").onchange = function () {
                    var checked = document.getElementById("e1").checked;
                    viewer.getScene().setElementsVisibility([elements[0]], checked);
                };
                document.getElementById("e2").onchange = function () {
                    var checked = document.getElementById("e2").checked;
                    viewer.getScene().setElementsVisibility([elements[1]], checked);
                };
                document.getElementById("e3").onchange = function () {
                    var checked = document.getElementById("e3").checked;
                    viewer.getScene().setElementsVisibility([elements[2]], checked);
                };
                document.getElementById("e4").onchange = function () {
                    var checked = document.getElementById("e4").checked;
                    viewer.getScene().setElementsVisibility([elements[3]], checked);
                };
                document.getElementById("e5").onchange = function () {
                    var checked = document.getElementById("e5").checked;
                    viewer.getScene().setElementsVisibility([elements[4]], checked);
                };
                document.getElementById("e6").onchange = function () {
                    var checked = document.getElementById("e6").checked;
                    viewer.getScene().setElementsVisibility([elements[5]], checked);
                };
                document.getElementById("e7").onchange = function () {
                    var checked = document.getElementById("e7").checked;
                    viewer.getScene().setElementsVisibility([elements[6]], checked);
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

