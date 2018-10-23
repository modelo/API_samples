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
        
        document.getElementById("specular").onchange = function(evt) {
            viewer.setSpecularEnabled(document.getElementById("specular").checked);
        };
        document.getElementById("shadow").onchange = function(evt) {
            viewer.setShadowEnabled(document.getElementById("shadow").checked);
        };
        document.getElementById("ao").onchange = function(evt) {
            viewer.setEffectEnabled("SSAO", document.getElementById("ao").checked);
        };
      
        $('#range1').range({
            min: 0,
            max: Math.PI,
            start: 1.0,
            step: 0.01,
            onChange: function (value) {
                viewer.setLightingLatitude(value);
            }
        });
        $('#range2').range({
            min: 0,
            max: 2.0 * Math.PI,
            start: 1.0,
            step: 0.01,
            onChange: function (value) {
                console.log(value);
                viewer.setLightingLongitude(value);
            }
        });
        $('#range3').range({
            min: 0,
            max: 1,
            start: 0.5,
            step: 0.01,
            onChange: function (value) {
                viewer.setLightingIntensity(value);
            }
        });
   
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () {
                viewer.addInput(new Modelo.View.Input.Mouse(c)); // Add mouse to control camera.
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

