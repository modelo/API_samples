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

        document.getElementById("rulertype").onchange = function () {
            var t = document.getElementById("rulertype").value;

            // Note that only one ruler should be enabled at the same time.
            for (var i = 0; i < rulers.length; i++) {
                rulers[i].setEnabled(false);
            }

            rulers[t].setEnabled(true);
            viewer.invalidate();
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
