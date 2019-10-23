Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {

        var that = this;

        var viewer1 = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
     
        viewer1.addInput(new Modelo.View.Input.Mouse(viewer1)); // Add mouse to control camera.

        viewer1.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            })


            var viewer2 = null;
        document.getElementById("switch-canvas").onclick = function() {

            if (!that.viewer1Paused) {
                viewer1.pause();

                viewer2 = new Modelo.View.Viewer360("model2");
                that.viewer1Paused = true;
            }
            else {
                viewer2.pause();
                viewer1.resume();
            }

     
            // viewer2.addInput(new Modelo.View.Input.Mouse(viewer2)); // Add mouse to control camera.
    
            // viewer2.loadModel(modelId, // Load the model into the viewer.
            //     null,
            //     function () { // success
            //         console.log("loading done");
            //     },
            //     function (errmsg) { // fail
            //         console.error(errmsg);
            //     },
            //     function (per) { // on progress
            //         var c = document.getElementById("progress");
            //         c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            //     })    
        }
    },
    function (err) {
        console.log(err);
    });


