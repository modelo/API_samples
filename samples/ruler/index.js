Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token

Modelo.Auth.signIn(appToken,
    function () {
        var viewer = new Modelo.View.Viewer3D("model");

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        var rulers = [
            new Modelo.View.Tool.MeasureLines(viewer),
            new Modelo.View.Tool.MeasureLine(viewer),
            new Modelo.View.Tool.MeasureLineStrip(viewer),
            new Modelo.View.Tool.MeasureLineFan(viewer),
            new Modelo.View.Tool.MeasureAngle(viewer),
            new Modelo.View.Tool.MeasureArea(viewer),
        ];

        viewer.addTool(rulers[0]);
        viewer.addTool(rulers[1]);
        viewer.addTool(rulers[2]);
        viewer.addTool(rulers[3]);
        viewer.addTool(rulers[4]);
        viewer.addTool(rulers[5]);

        var currentRulerType = -1;

        rulers[0].setEnabled(false);
        rulers[1].setEnabled(false);
        rulers[2].setEnabled(false);
        rulers[3].setEnabled(false);
        rulers[4].setEnabled(false);
        rulers[5].setEnabled(false);

        document.getElementById("rulertype").onchange = function () {
            var t = document.getElementById("rulertype").value;
            if (t === "Type") {
                for (var i = 0; i < rulers.length; i++) {
                    rulers[i].setEnabled(false);
                }
                document.getElementById("unit").setAttribute("disabled", "");
                return;
            }
            // Note that only one ruler should be enabled at the same time.
            for (var i = 0; i < rulers.length; i++) {
                rulers[i].setEnabled(false);
            }
            rulers[t].setEnabled(true);
            viewer.invalidate();
            currentRulerType = t;
            document.getElementById("unit").removeAttribute("disabled");
        };

        document.getElementById("unit").onchange = function () {
            if (currentRulerType < 0) {
                return;
            }
            var unit = document.getElementById("unit").value;
            switch (unit) {
                case "0":
                    rulers[currentRulerType].setUnit("m");
                    break;
                case "1":
                    rulers[currentRulerType].setUnit("cm");
                    break;
                case "2":
                    rulers[currentRulerType].setUnit("feet");
                    break;
                case "3":
                    rulers[currentRulerType].setUnit("inches");
                    break;
                default:
                    rulers[currentRulerType].setUnit("m");
                    break
            }
        };

        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");

                viewer.getEventEmitter().on("Measure-Update", (args) => {
                    document.getElementById('result').innerHTML = JSON.stringify(args);
                });
                // Update the current cursor coordinate.
                viewer.getEventEmitter().on("Measure-DotUpdate", (args) => {
                    //console.log(args); // contains snapTo, snapPos
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
