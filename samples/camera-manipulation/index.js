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
                var keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
                viewer.addInput(keyboard);
                keyboard.addKeyUpListener(function (keyboard) {
                    if (keyboard.key === 27) {
                        viewer.destroy();
                    }
                }); 
                console.log("done");
            },
            function (errmsg) {
                console.log(errmsg); // The loading error.
            },
            function (per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });

        document.getElementById("top").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.TOP);
        });
        document.getElementById("bottom").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.BOTTOM);
        });
        document.getElementById("front").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.FRONT);
        });
        document.getElementById("back").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.BACK);
        });
        document.getElementById("left").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.LEFT);
        });
        document.getElementById("right").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.RIGHT);
        });

        document.getElementById("default").addEventListener("click", function () {
            viewer.getCamera().switchToView(Modelo.View.ViewAngle.WORLD);
        });

    },
    function (errmsg) {
        console.log(errmsg); // If there is any sign-inerror.
    });


