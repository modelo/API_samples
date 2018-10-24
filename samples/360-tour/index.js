Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var bgcolor = [1, 1, 1];
var modelId = "wm8vx71L";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        var c = document.getElementById("model");

        var w = c.clientWidth;
        var h = c.clientHeight;
        var viewer = new Modelo.View.Viewer360(c, false, w, h);

        window.addEventListener("resize",function() {
            var c = document.getElementById("model");
            var w = c.clientWidth;
            var h = c.clientHeight;
            viewer.resize(w, h);
        });
        
        viewer.addInput(new Modelo.View.Input.Mouse(c)); // Add mouse to control camera.

        viewer.loadModel(modelId,
            null,
            function () {
            },
            function (errmsg) {
                console.log(errmsg);
            },
            function (per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });
    },
    function (errmsg) {
        console.log(errmsg);
    })


