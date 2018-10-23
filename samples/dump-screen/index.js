Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
Modelo.Auth.signIn(appToken, 
    function() {
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

        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function() {
                document.getElementById("dump").onclick = function() {
                    var shot = viewer.dumpScreen(960, 640);
                    document.getElementById("screenshot").src = shot;
                    console.log(shot);
                }
                
                console.log("done");
            },
            function(errmsg) {
                console.log(errmsg); // The loading error.
            },
            function(per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });
    },
    function (errmsg){
        console.log(errmsg); // If there is any sign-inerror.
    });

