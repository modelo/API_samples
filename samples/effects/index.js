Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
var c = document.getElementById("model");

document.body.appendChild(c);


Modelo.Auth.signIn(appToken,
    null,
    function () {
        var viewer = new Modelo.View.Viewer3D("model");

        document.getElementById("ssao").onchange = function (evt) {
            viewer.setEffectEnabled("SSAO", document.getElementById("ssao").checked);
        };

        document.getElementById("sketch").onchange = function (evt) {
            viewer.setEffectEnabled("Sketch", document.getElementById("sketch").checked);
        };
        document.getElementById("sketch_color").onchange = function (evt) {
            viewer.setEffectParameter("Sketch", "colored", document.getElementById("sketch_color").checked);
        };
        document.getElementById("sketch_detail").oninput = function (evt) {
            var c = parseFloat(document.getElementById("sketch_detail").value);
            c = Math.min(Math.max(c, 0.0), 1.0) * 100.0;
            viewer.setEffectParameter("Sketch", "detail", c);
        };
        document.getElementById("sketch_contrast").oninput = function (evt) {
            var c = parseFloat(document.getElementById("sketch_contrast").value);
            c = Math.min(Math.max(c, 0.0), 1.0) * 100.0;
            viewer.setEffectParameter("Sketch", "contrast", c);
        };
        document.getElementById("sketch_line_color").oninput = function (evt) {
            var c = parseFloat(document.getElementById("sketch_line_color").value);
            c = Math.min(Math.max(c, 0.0), 1.0);
            viewer.setEffectParameter("Sketch", "color", [c, c, c]);
        };
        document.getElementById("sketch_surface_color").oninput = function (evt) {
            var c = parseFloat(document.getElementById("sketch_surface_color").value);
            c = Math.min(Math.max(c, 0.0), 1.0);
            viewer.setEffectParameter("Sketch", "surfaceColor", [c, c, c]);
        };
        viewer.loadModel(modelId,
            null,
            function () {
                viewer.addInput(new Modelo.View.Input.Mouse(viewer));

                var keyboard = new Modelo.View.Input.Keyboard(viewer);
                viewer.addInput(keyboard);
                keyboard.addKeyUpListener(function (keyboard) {
                    if (keyboard.key === 69) {
                    }
                });

                console.log("done");
            },
            function (errmsg) {
                console.log(errmsg);
            },
            function (per) {
                console.log(per);
            });
    },
    function (errmsg) {
        console.log(errmsg);
    })
