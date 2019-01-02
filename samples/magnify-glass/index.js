Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

Modelo.Auth.signIn(appToken,
    function () {
        var viewer = new Modelo.View.Viewer3D("model");
   
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () {
                viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

                var magnifyGlass = new Modelo.View.Tool.MagnifyGlass(viewer);
                viewer.addTool(magnifyGlass);

                // We should cancel magnify glass when it is used. Otherwise it 
                // will intercept the mouse events always and make the camera
                // rotation disabled.
                viewer.getEventEmitter().on('MagnifyGlass-Selected', function() {
                    magnifyGlass.setEnabled(false);
                    document.getElementById("magnifyGlass").checked = false;
                });

                document.getElementById("magnifyGlass").onchange = function() {
                    var checked = document.getElementById("magnifyGlass").checked;
                    magnifyGlass.setEnabled(checked);
                };
                
                console.log("done");
            },
            function (errmsg) {
                console.log(errmsg); // The loading error.
            },
            function (per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });
    },
    function (errmsg) {
        console.log(errmsg); // If there is any sign-inerror.
    });

